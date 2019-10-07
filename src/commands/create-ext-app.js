import chalk from "chalk";
import { getAnwsers } from "../questions/ext-app";
import {gitFlow} from "../git/git";
import {deleteFolder} from "../files/utils";
import {local} from "../../utils/constants";
import {initializeExtensionApp} from "../initializer/initializer";
import {extensionAppFilesFlow} from "../files/files";
import fs from 'fs';
const execSync = require('child_process').execSync;

const repoUrl = "git@github.com:SymphonyPlatformSolutions/sms-dev-fe-template-app.git";
const repoBranch = 'remotes/origin/feature/MS-1149-app-sample';

const createExtensionApp = async (options) => {
  console.log(chalk.bold(
    'This template will guide you through the process to create an extension app template'
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
    console.log(chalk.rgb('#00FF00').bold('This template will guide you through the process to create an extension app template'));
    execSync('yarn start:mock',{stdio: 'inherit'});
  }
};

export default createExtensionApp;
