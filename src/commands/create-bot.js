import {generateBotKeys} from "./generate-keys";

const execSync = require('child_process').execSync;
import chalk from "chalk";
import { getAnwsers } from "../questions/create-bot";
import {gitFlow} from "../git/git";
import {deleteFolder} from "../files/utils";
import {local} from "../../utils/constants";
import {initializeBotApp} from "../initializer/initializer";
import {botFilesFlow} from "../files/files";
import fs from 'fs';

const repoUrl = "git@github.com:SymphonyPlatformSolutions/sms-sdk-botler.git";
const repoBranch = 'refs/remotes/origin/songwriter';

const createBot = async (options) => {
  console.log(chalk.bold('Setting up a new Bot application'));
  const awnsers = await getAnwsers(options);
  const targetFolder = `${options.cwd}/${awnsers.botName}`;
  fs.existsSync(targetFolder) || fs.mkdirSync(targetFolder);
  process.chdir(targetFolder);
  deleteFolder(local);
  await gitFlow(repoUrl, repoBranch);
  await botFilesFlow(awnsers);
  const pubKey = await generateBotKeys(targetFolder, awnsers.botServiceEmail, awnsers.botId);
  await initializeBotApp();
  deleteFolder(local);
  console.log(chalk.bold('Project ready %s'), chalk.green.bold('DONE'));
  console.log(chalk.bold('********************************************************************************************'));
  console.log(chalk.bold('Here follows your public key, it needs to be added to the POD your bot is going to run at'));
  console.log(chalk.bold('please visit: https://developers.symphony.com/symphony-developer/docs/create-a-bot-user to learn more.'));
  console.log(chalk.bold('********************************************************************************************'));
  console.log(pubKey);
  if(options.run) {
    console.log(chalk.rgb('#00FF00').bold(
      'Starting the bot application'
    ));
    execSync('mvn spring-boot:run',{stdio: 'inherit'});
  }
};

export default createBot;
