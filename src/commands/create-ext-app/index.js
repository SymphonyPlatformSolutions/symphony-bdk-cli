import chalk from "chalk";
import { getAnwsers } from "./questions";
import { gitFlow } from "../../utils/git/git";
import { deleteFolder } from "../../utils/files/utils";
import { local } from "../../utils/constants";
import { initializeExtensionApp } from "../../utils/initializer/initializer";
import { extensionAppFilesFlow } from "../../utils/files/files";
import fs from 'fs';
const execSync = require('child_process').execSync;

const repoUrl = "git@github.com:SymphonyPlatformSolutions/sms-dev-fe-template-app.git";
const repoBranch = 'remotes/origin/develop';

export default async (options) => {
  console.log(chalk.bold(
    'This tool will guide you through the process to create an extension app template'
  ));
  const awnsers = await getAnwsers(options);
  const targetFolder = `${options.cwd}/${awnsers.projectName}`;
  fs.existsSync(targetFolder) || fs.mkdirSync(targetFolder);
  process.chdir(targetFolder);
  deleteFolder(local);
  await gitFlow(repoUrl, repoBranch);
  await extensionAppFilesFlow(awnsers);
  await initializeExtensionApp();
  deleteFolder(local);
  console.log(chalk.bold('Project ready %s'), chalk.green.bold('DONE'));
  if(options.run) {
    console.log(chalk.rgb('#00FF00').bold('This tool will guide you through the process to create an extension app template'));
    execSync('yarn start:mock',{stdio: 'inherit'});
  }
};