



# It Is Pull Request Time? ⏰

Some [studies](https://smartbear.com/learn/code-review/best-practices-for-peer-code-review/) proves that developers should not review more than 400 lines of code at time, but work in [small batches](https://cloud.google.com/solutions/devops/devops-process-working-in-small-batches) is hard, mostly when you're not used to it.

This extension helps you to create more commits and smaller pull requests based on git modifications :octocat:

# How it works

The default configuration checks every five seconds for your changes, and if you have more than **200 modifications** between *insertions* and *deletions* the extension will ask you if **It Is a Pull Request Time** ⏰

Then, you will have options for

### Trigger a commit with the **Open It** option:

 <img src="https://github.com/gabrielbs/vscode-pull-request-time/blob/main/commit-demo.gif" />

### Or snooze it for five, ten or a custom amount minutes:

   <img src="https://github.com/gabrielbs/vscode-pull-request-time/blob/main/custom-snooze-demo.gif" />

# Instalation
Search for `pull request time` on VSCode Extensions

Or

Launch VS Code Quick Open (`Ctrl+P`), paste the following command, and press enter.

`ext install gabriielbs0673.pull-request-time`

# Improvements

 - [ ] Receive interval time from [extension configs](https://code.visualstudio.com/api/extension-capabilities/common-capabilities#configuration)
 - [ ] Receive max modifications number from [extension configs](https://code.visualstudio.com/api/extension-capabilities/common-capabilities#configuration)
