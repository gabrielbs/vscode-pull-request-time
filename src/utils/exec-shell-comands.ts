import { exec } from "node:child_process";

export const execShellCommand = (cmd: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec(cmd, (error: any, stdout: string) => {
      if (stdout) {
        resolve(stdout);
      } else {
        reject("Occurred something wrong running the command");
      }
    });
  });
};
