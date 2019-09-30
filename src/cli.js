import { getCommands } from "./commands/commands";
import { getVariableValues } from "./questions/questions";
import {gitFlow} from "./git/git";
import {deleteFolder} from "./files/utils";
import {local} from "../utils/constants";
import {initializeProject} from "./initializer/initializer";
import chalk from "chalk";
import {filesFlow} from "./files/files";
const program = require('commander');
var path = require('path');

const terminalImage = require('terminal-image');

const createExtApp = async (args) => {
    console.log(await terminalImage.file(path.resolve(__dirname, './assets/logo-symphony.png')));
      console.log(chalk.bold('This template will guide you through the process to create an extension app template'));
      let options = getCommands(args);
      options = await getVariableValues(options);
      deleteFolder(local);
      await gitFlow();
      await filesFlow(options);
      await initializeProject();
      deleteFolder(local);
      console.log(chalk.bold('Project ready %s'), chalk.green.bold('DONE'));
}

const createBotApp = async (args) => {
    console.log(chalk.bold('Not implemented'));
}

program.version('0.0.1', '-v, --vers', 'output the current version');
program
    .command('create-extension-app') // sub-command name
    .alias('ext') // alternative sub-command is `al`
    .description('Creates a Symphony Bot Extension application') // command description
    .action(createExtApp);

program
    .command('create-bot') // sub-command name
    .alias('bot') // alternative sub-command is `al`
    .description('Creates a Symphony Bot application') // command description
    .action(createBotApp);


// allow commander to parse `process.argv`
program.parse(process.argv);
