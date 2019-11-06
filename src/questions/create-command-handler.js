import inquirer from "inquirer";
const chalk = require('chalk');
import {notEmpty} from "../../utils/helper";

async function promptForMissingOptions(options) {
  console.log(chalk.bold('Please answer the following question'));
  const questions = [];

  if (!options.commandName) {
    questions.push({
      name: 'commandName',
      message: 'What\'s the new Command name? ',
      validate: (str) => notEmpty(str) && str && str.charAt(0) === str.charAt(0).toUpperCase(),
      default: '',
    });
  }
  const answers = await inquirer.prompt(questions);

  return {
    ...options,
    commandName: options.commandName || answers.commandName,
  };
}

export async function getAnwsers(options) {
  return await promptForMissingOptions(options);
}
