import * as vscode from "vscode";
import { execShellCommand } from "./utils/exec-shell-comands";
import {
  formatCustomInterval,
  getAlertTextMessage,
  getModificationsNumber,
} from "./utils/formatters";
import {
  MESSAGE,
  INTERVAL,
  MAX_MODIFICATIONS_NUMBER,
  optionsSchema,
  OptionSchemaType,
} from "./utils/configs";

const getTimeoutInterval = (selected?: MESSAGE) => {
  return (
    optionsSchema.find((option) => option.title === selected)?.interval ||
    INTERVAL.default
  );
};

const selectionHandler = (selection?: OptionSchemaType) => {
  const { showInputBox } = vscode.window;
  loader(selection?.title);

  if (selection?.title === MESSAGE.snoozeCustom) {
    showInputBox({
      prompt: "How many minutes do you want to snooze? (integer)",
      placeHolder: "7",
    }).then((value) => {
      loader(selection?.title, Number(value));
    });

    return;
  }

  if (selection?.title === MESSAGE.openIt) {
    vscode.commands.executeCommand("git.commit");
  }
};

export const dispatchMessage = async (message: string) => {
  try {
    const { showInformationMessage } = vscode.window;
    const selection = await showInformationMessage(
      message,
      { modal: true },
      ...optionsSchema
    );
    selectionHandler(selection);
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

const loader = (selected?: MESSAGE, customInterval?: number) => {
  const timeout = !!customInterval
    ? formatCustomInterval(customInterval)
    : getTimeoutInterval(selected);

  clearInterval(interval);
  interval = setInterval(checkFilesDiff, timeout);
};

export function activate() {
  console.log("Extension is running =)");
  loader();
}

export function deactivate() {
  clearInterval(interval);
}
