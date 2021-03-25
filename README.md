
# It Is Pull Request Time?

[Studies](https://smartbear.com/learn/code-review/best-practices-for-peer-code-review/) proves that developers should not review more than 400 lines of code at a time, but work in [small batches](https://cloud.google.com/solutions/devops/devops-process-working-in-small-batches) is hard! Mostly at the beginning.

This extension helps you to remember to make more commits and create smaller pull requests based on git modifications :)

The default configuration checks every five minutes for your changes and if you have more than 250 modifications between *insertions* and *deletions* the extension will ask you if **It Is a Pull Request Time** 

![pull request time demo](https://github.com/gabrielbs/vscode-pull-request-time/blob/main/demo.gif)

# Instalation
Search for `pull request time` on VSCode Extensions

Or

Launch VS Code Quick Open (`Ctrl+P`), paste the following command, and press enter.

`ext install gabriielbs0673.pull-request-time`

# Improvements

 - [ ] Receive interval time from [extension configs](https://code.visualstudio.com/api/extension-capabilities/common-capabilities#configuration)
 - [ ] Receive target files changed from [extension configs](https://code.visualstudio.com/api/extension-capabilities/common-capabilities#configuration)
 - [ ] Trigger commit action after click in the ["Open It" button](https://code.visualstudio.com/api/references/vscode-api#commands)
 - [ ] Create options in the Information Message like "Snooze for 10 minutes"
