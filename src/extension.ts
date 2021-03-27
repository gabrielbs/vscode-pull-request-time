/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from "vscode";
import {
  execShellCommand,
  getAlertTextMessage,
} from "./utils/execShellCommand";

// Receive this consts from extension config
// const MAX_MODIFICATIONS_NUMBER = 200;
const MAX_MODIFICATIONS_NUMBER = 1;

enum ALERT_OPTIONS {
  OPEN_IT = "Open it 💜",
  SNOOZE_5 = "Snooze for 5 minutes",
  SNOOZE_10 = "Snooze for 10 minutes",
}

enum INTERVALS {
  // DEFAULT = 1000 * 5, // five seconds
  // OPEN_IT = 1000 * 60 * 2, // two minutes
  // FIVE_MINUTES = 1000 * 60 * 5, // five minutes
  // TEN_MINUTES = 1000 * 60 * 10, // 10 minutes
  DEFAULT = 1000 * 1, // five seconds
  OPEN_IT = 1000 * 5, // two minutes
  FIVE_MINUTES = 1000 * 10, // five minutes
  TEN_MINUTES = 1000 * 20, // 10 minutes
}

const alertOptions = [
  {
    title: ALERT_OPTIONS.OPEN_IT,
    interval: INTERVALS.OPEN_IT,
  },
  { title: ALERT_OPTIONS.SNOOZE_5, interval: INTERVALS.FIVE_MINUTES },
  { title: ALERT_OPTIONS.SNOOZE_10, interval: INTERVALS.TEN_MINUTES },
];

const getTimeoutInterval = (selected?: ALERT_OPTIONS) => {
  return (
    alertOptions.find((option) => option.title === selected)?.interval ||
    INTERVALS.DEFAULT
  );
};

export const performPullRequestChecks = async (
  filesChanged: number,
  gitDiffText: string
) => {
  if (filesChanged > MAX_MODIFICATIONS_NUMBER) {
    try {
      const { showInformationMessage } = vscode.window;
      const message = getAlertTextMessage(gitDiffText);
      const selection = await showInformationMessage(message, ...alertOptions);

      check(selection?.title);
    } catch (error) {
      console.log(error);
    }
  }
};

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

const app = async () => {
  const modifications = await getModifiedFilesAmount();
  const modificationsNumber = getModificationsNumber(modifications);
  performPullRequestChecks(modificationsNumber, modifications);
};

let interval: NodeJS.Timeout;

const check = (selected?: ALERT_OPTIONS) => {
  clearInterval(interval);
  interval = setInterval(app, getTimeoutInterval(selected));
};

export function activate() {
  console.log("Extension is running =)");
  check();
}

export function deactivate() {
  clearInterval(interval);
}
