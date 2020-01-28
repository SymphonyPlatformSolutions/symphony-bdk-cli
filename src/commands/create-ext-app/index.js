import chalk from "chalk";
import { getAnwsers } from "./questions";
import { gitFlow } from "../../utils/git/git";
import { initializeExtensionApp } from "../../utils/initializer/initializer";
import { extensionAppFilesFlow } from "../../utils/files/files";
import fs from 'fs';
const execSync = require('child_process').execSync;

const repoUrl = "SymphonyPlatformSolutions/sms-dev-fe-template-app#develop";

export default async (options) => {
  console.log(chalk.bold(
    'This tool will guide you through the process to create an extension app template'
  ));
  const awnsers = await getAnwsers(options);
  const targetFolder = `${options.cwd}/${awnsers.projectName}`;
  fs.existsSync(targetFolder) || fs.mkdirSync(targetFolder);
  process.chdir(targetFolder);
  await gitFlow(repoUrl, targetFolder);
  await extensionAppFilesFlow(awnsers, targetFolder);
  await initializeExtensionApp();
  console.log(chalk.bold('Project ready %s'), chalk.green.bold('DONE'));
  if(options.run) {
    console.log(chalk.rgb('#00FF00').bold('This tool will guide you through the process to create an extension app template'));
    execSync('yarn start:mock',{stdio: 'inherit'});
  }
};
