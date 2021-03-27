import * as vscode from "vscode";
import { execShellCommand } from "./utils/exec-shell-comands";
import {
  getAlertTextMessage,
  getModificationsNumber,
} from "./utils/formatters";
import {
  MESSAGE,
  INTERVAL,
  MAX_MODIFICATIONS_NUMBER,
  schema,
} from "./utils/options";

const getTimeoutInterval = (selected?: MESSAGE) => {
  return (
    schema.find((option) => option.title === selected)?.interval ||
    INTERVAL.default
  );
};

export const dispatchMessage = async (message: string) => {
  try {
    const { showInformationMessage } = vscode.window;
    const selection = await showInformationMessage(message, ...schema);

    loader(selection?.title);
  } catch (error) {
    console.log(error);
  }
};

export const getModifiedFilesAmount = async (): Promise<string> => {
  const cmd = await execShellCommand("git diff --shortstat");
  return String(cmd);
};

const checkFilesDiff = async () => {
  const modifications = await getModifiedFilesAmount();
  const modificationsNumber = getModificationsNumber(modifications);
  if (modificationsNumber > MAX_MODIFICATIONS_NUMBER) {
    const message = getAlertTextMessage(modifications);
    dispatchMessage(message);
  }
};

let interval: NodeJS.Timeout;

const loader = (selected?: MESSAGE) => {
  clearInterval(interval);
  interval = setInterval(checkFilesDiff, getTimeoutInterval(selected));
};

export function activate() {
  console.log("Extension is running =)");
  loader();
}

export function deactivate() {
  clearInterval(interval);
}
