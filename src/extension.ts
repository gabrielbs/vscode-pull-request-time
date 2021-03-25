import * as vscode from "vscode";
import { exec } from "child_process";

// Receive this consts from extension config
const MAX_MODIFICATIONS_NUMBER = 200;
const CHECK_INTERVAL_TIME = 1000 * 60 * 5;

export const performPullRequestChecks = (
  filesChanged: number,
  gitDiffText: string
) => {
  if (filesChanged > MAX_MODIFICATIONS_NUMBER) {
    vscode.window
      .showInformationMessage(
        `What do you think about opening a Pull Request? 🥰\n~ You already have ${gitDiffText}`,
        { modal: true },
        "Open it 💜"
      )
      .then((selection) => {
        // Perform commit action?
        console.log(selection);
      });
  }
};

export function execShellCommand(cmd: string): Promise<string> {
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

export const getModifiedFilesAmount = async (): Promise<string> => {
  const cmd = await execShellCommand("git diff --shortstat");
  return String(cmd);
};

const sumAddedWithDeleted = (acc: number, curr: number) => {
  acc += curr;
  return acc;
};

const getModificationsNumber = (modifications: string) => {
  return modifications
    .slice(1)
    .split(",")
    .map((item) => Number(item.replace(/[^0-9]+/g, "")))
    .reduce(sumAddedWithDeleted, 0);
};

let interval: NodeJS.Timeout;

const app = async () => {
  const modifications = await getModifiedFilesAmount();
  const modificationsNumber = getModificationsNumber(modifications);

  performPullRequestChecks(modificationsNumber, modifications);
};

export function activate(context: vscode.ExtensionContext) {
  console.log("Extension is running =)");
  app();
  interval = setInterval(app, CHECK_INTERVAL_TIME);
}

export function deactivate() {
  clearInterval(interval);
}
