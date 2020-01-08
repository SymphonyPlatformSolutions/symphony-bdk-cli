import inquirer from "inquirer";
const chalk = require('chalk');
import {notEmpty} from "../../utils/helper";

export const HANDLER_TYPES = [
 'Regular command',
 'Symphony Elements',
];

async function promptForMissingOptions(options) {
  console.log(chalk.bold('Please answer the following question'));
  const questions = [];

  if (!options.type) {
    questions.push({
      type: 'list',
      name: 'type',
      message: 'Would you like to use a Regular Command Handler or a Symphony Elements handler?',
      choices: HANDLER_TYPES,
    });
  }

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

    if (!options.formId) {
    questions.push({
      name: 'formId',
      message: 'please provide an Id for your form:',
      when: (responses) => responses.elementType,
    });
  }

  const answers = await inquirer.prompt(questions);

  return {
    ...options,
    commandName: options.commandName || answers.commandName,
    type: options.type || answers.type,
    formId: options.formId || answers.formId,
  };
}

export async function getAnwsers(options) {
  return await promptForMissingOptions(options);
}
