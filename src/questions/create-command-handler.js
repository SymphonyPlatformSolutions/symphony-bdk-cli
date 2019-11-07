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
      validate: notEmpty,
      filter: (str) => {
        const firstLetter = str.charAt(0).toUpperCase();
        return `${firstLetter}${str.slice(1,str.length)}`;
      },
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
