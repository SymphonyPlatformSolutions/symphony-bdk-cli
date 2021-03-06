import chalk from "chalk";
import { getAnwsers } from "./questions";
import { gitFlow } from "../../utils/git/git";
import { initializeExtensionApp } from "../../utils/initializer/initializer";
import { extensionAppFilesFlow } from "../../utils/files/files";
import fs from 'fs';
const execSync = require('child_process').execSync;

const repoUrl = "SymphonyPlatformSolutions/symphony-bdk-app-template#develop";

export default async (options) => {
  console.log(chalk.bold(
    'This tool will guide you through the process to create an extension app template'
  ));
  const awnsers = await getAnwsers(options);
  const targetFolder = `${options.cwd}/${awnsers.projectName}`;

  if(fs.existsSync(targetFolder)) {
    throw new Error(new Error('There\'s a Project with that name in this folder, either choose a new name or remove the existing one.'));
  } else {
    fs.mkdirSync(targetFolder);
  }

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
