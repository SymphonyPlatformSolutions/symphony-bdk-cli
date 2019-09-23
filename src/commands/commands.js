import chalk from "chalk";
import {spinnerStart, spinnerStop} from "../../utils/spinner";

const commander = require('commander');
const program = new commander.Command();
program.version('0.0.1');

//Add posible values of command
program
  .option('--create-extension-app','createExtensionApp', false);

//Parse response into an object
var commands;
const parseResponse = (args) => {
  spinnerStart('Parsing commands');
  let options = program.parse(args);
  commands = {
    ...commands,
    createExtensionApp: options.createExtensionApp
  };
  spinnerStop(chalk.bold('Commands ') + chalk.green.bold("PARSED"));
  return commands
};

//Interface with CLI
export const getCommands = (args) => {
  return parseResponse(args);
};
