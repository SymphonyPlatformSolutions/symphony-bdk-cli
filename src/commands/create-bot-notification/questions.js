import inquirer from "inquirer";
const chalk = require('chalk');
import { notEmpty } from "../../utils/helper";

export const NOTIFICATION_TEMPLATE_OPTIONS = {
  SIMPLE: 'SIMPLE',
  ALERT: 'ALERT',
  NOTIFICATION: 'NOTIFICATION',
  INFORMATION: 'INFORMATION',
  TABLE: 'TABLE',
  LIST: 'LIST',
};

async function promptForMissingOptions(options) {
  console.log(chalk.bold('Please answer the following questions'));
  const questions = [];

  if (!options.template) {
    questions.push({
      type: 'list',
      name: 'template',
      message: 'which notification template would you like to use?',
      choices: Object.keys(NOTIFICATION_TEMPLATE_OPTIONS).map(key => key),
      default: null,
    });
  }

  if (!options.hasHandler) {
    questions.push({
      type: 'confirm',
      name: 'hasHandler',
      message: 'would you like to create a handler for this template?',
      default: null,
    });
  }

  if (!options.notificationName) {
    questions.push({
      name: 'notificationName',
      message: 'What\'s the template name? (CamelCase)',
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
    notificationName: options.notificationName || answers.notificationName,
    type: options.type || answers.type,
    template: options.template || answers.template,
    hasHandler: options.hasHandler || answers.hasHandler,
  };
}

export async function getAnwsers(options) {
  return await promptForMissingOptions(options);
}
