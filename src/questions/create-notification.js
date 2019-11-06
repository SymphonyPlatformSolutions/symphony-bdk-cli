import inquirer from "inquirer";
const chalk = require('chalk');
import { isUpperCase } from "../../utils/helper";

export const NOTIFICATION_TEMPLATE_OPTIONS = {
  SIMPLE: 'SIMPLE',
  ALERT: 'ALERT',
  NOTIFICATION: 'NOTIFICATION',
  INFORMATION: 'INFORMATION',
  TABLE: 'TABLE',
  LIST: 'LIST',
};

export const NOTIFICATION_CUSTOM_OPTIONS = {
    NEW_TEMPLATE: 'NEW_TEMPLATE',
    ALERT: 'ALERT',
    INFORMATION: 'INFORMATION',
};

async function promptForMissingOptions(options) {
  console.log(chalk.bold('Please answer the question bellow'));
  const questions = [];

  if (!options.notificationName) {
    questions.push({
      name: 'notificationName',
      message: 'What\'s the notification name?(UPPER_CAMEL_CASE)',
      validate: isUpperCase,
      default: '',
    });
  }

  if (!options.type) {
    questions.push({
      type: 'list',
      name: 'type',
      message: 'Would you like to use a template, or build your own?',
      choices: ['Template', 'Custom'],
    });
  }

  if (!options.template) {
    questions.push({
      type: 'list',
      name: 'template',
      message: 'which notification template would you like to use?',
      choices: Object.keys(NOTIFICATION_TEMPLATE_OPTIONS).map(key => key),
      default: null,
      when: (responses) => responses.type === 'Template',
    });
  }

  if (!options.custom) {
    questions.push({
      type: 'list',
      name: 'custom',
      message: 'which notification template would you like to use?',
      choices: Object.keys(NOTIFICATION_CUSTOM_OPTIONS).map(key => key),
      default: null,
      when: (responses) => responses.type === 'Custom',
    });
  }

  const answers = await inquirer.prompt(questions);

  return {
    ...options,
    notificationName: options.notificationName || answers.notificationName,
    type: options.type || answers.type,
    template: options.template || answers.template,
    custom: options.custom || answers.custom,
  };
}

export async function getAnwsers(options) {
  return await promptForMissingOptions(options);
}
