import * as vscode from "vscode";
import { exec } from "child_process";

// Receive this consts from extension config
const MAX_FILES_CHANGED = 10;
const CHECK_INTERVAL_TIME = 1000 * 60 * 2;

const performPullRequestChecks = (filesChanged: number) => {
  if (filesChanged > MAX_FILES_CHANGED) {
    vscode.window
      .showInformationMessage(
        "What do you think about opening a Pull Request? 🥰",
        "Open it 💜"
      )
      .then((selection) => {
        // Perform commit action?
        console.log(selection);
      });
  }
};

function execShellCommand(cmd: string) {
  return new Promise((resolve, reject) => {
    exec(cmd, (error: any, stdout: string) => {
      if (stdout) {
        resolve(stdout);
      } else {
        reject("Occurred something wrong running the command");
      }
    });
  });
}

const getModifiedFilesAmount = async () => {
  const cmd = await execShellCommand("git status -s -uno | wc -l");
  return cmd;
};

let interval: NodeJS.Timeout;

export function activate(context: vscode.ExtensionContext) {
  console.log("Extension is running =)");
  interval = setInterval(async () => {
    const filesChanged = await getModifiedFilesAmount();
    performPullRequestChecks(Number(filesChanged));
  }, CHECK_INTERVAL_TIME);
}

export function deactivate() {
  clearInterval(interval);
}
