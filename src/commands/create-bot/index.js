import {generateBotKeys} from "../generate-keys";

const execSync = require('child_process').execSync;
import chalk from "chalk";
import { getAnwsers } from "./questions";
import {gitFlow} from "../../utils/git/git";
import {initializeBotApp} from "../../utils/initializer/initializer";
import {botFilesFlow} from "../../utils/files/files";
import fs from 'fs';

const repoUrl = "SymphonyPlatformSolutions/symphony-bdk-bot-template-java#master";

export default async (options) => {
  console.log(chalk.bold('Setting up a new Bot application'));
  const awnsers = await getAnwsers(options);
  const targetFolder = `${options.cwd}/${awnsers.projectName}`;
  if (fs.existsSync(targetFolder)) {
    throw new Error(new Error('There\'s a Project with that name in this folder, either choose a new name or remove the existing one.'));
  }else {
    fs.mkdirSync(targetFolder);
  }

  await gitFlow(repoUrl, targetFolder);
  process.chdir(targetFolder);
  await botFilesFlow(awnsers);
  const pubKey = await generateBotKeys(targetFolder, awnsers.botServiceEmail, awnsers.projectName.toLowerCase());
  await initializeBotApp();
  console.log(chalk.bold('Project ready %s'), chalk.green.bold('DONE'));
  console.log(chalk.bold('********************************************************************************************'));
  console.log(chalk.bold('Please find below the bot public key, it must be added to the bot user account'));
  console.log(chalk.bold('please visit: https://developers.symphony.com/restapi/docs/rsa-bot-authentication-workflow to learn more.'));
  console.log(chalk.bold('********************************************************************************************'));
  console.log(pubKey);
  if(options.run) {
    console.log(chalk.rgb('#00FF00').bold(
      'Starting the bot application'
    ));
    execSync('mvn spring-boot:run',{stdio: 'inherit'});
  }
};
