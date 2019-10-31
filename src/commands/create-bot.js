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
const repoBranch = 'refs/remotes/origin/songwriters';

const createBot = async (options) => {
  console.log(chalk.bold('Setting up a new Bot application'));
  const awnsers = await getAnwsers(options);
  const targetFolder = `${options.cwd}/${awnsers.botName}`;
  fs.existsSync(targetFolder) || fs.mkdirSync(targetFolder);
  process.chdir(targetFolder);
  deleteFolder(local);
  await gitFlow(repoUrl, repoBranch);
  await botFilesFlow(awnsers);
  await initializeBotApp();
  deleteFolder(local);
  console.log(chalk.bold('Project ready %s'), chalk.green.bold('DONE'));
  if(options.run) {
    console.log(chalk.rgb('#00FF00').bold(
      'This template will guide you through the process to create an bot boilerplate'
    ));
    execSync('mvn spring-boot:run',{stdio: 'inherit'});
  }
};

export default createBot;
