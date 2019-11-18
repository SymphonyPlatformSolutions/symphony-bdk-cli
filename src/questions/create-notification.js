import inquirer from "inquirer";
const chalk = require('chalk');
import { isUpperCase } from "../../utils/helper";

export const NOTIFICATION_TYPES = [
  'Template',
  'Financial Elements',
  'Custom',
];

export const NOTIFICATION_TEMPLATE_OPTIONS = {
  SIMPLE: 'SIMPLE',
  ALERT: 'ALERT',
  NOTIFICATION: 'NOTIFICATION',
  INFORMATION: 'INFORMATION',
  TABLE: 'TABLE',
  LIST: 'LIST',
};

export const NOTIFICATION_FINANCIAL_ELEMENTS_OPTIONS = {
  RFQ_INITIATED: 'RFQ_INITIATED',
  RFQ_AKNOWLEDGED: 'RFQ_AKNOWLEDGED',
  RFQ_PRICED: 'RFQ_PRICED',
  RFQ_AGREED_PAY: 'RFQ_AGREED_PAY',
  RFQ_CONFIRMED: 'RFQ_CONFIRMED',
  RFQ_TIMEOUT: 'RFQ_TIMEOUT',
  RFQ_PASSED: 'RFQ_PASSED',
};

export const NOTIFICATION_CUSTOM_OPTIONS = {
    NEW_TEMPLATE: 'NEW_TEMPLATE',
    FINANCIAL_TEMPLATE: 'FINANCIAL_TEMPLATE',
    ALERT: 'ALERT_TEMPLATE',
    INFORMATION: 'INFORMATION_TEMPLATE',
};

async function promptForMissingOptions(options) {
  console.log(chalk.bold('Please answer the following questions'));
  const questions = [];

  if (!options.type) {
    questions.push({
      type: 'list',
      name: 'type',
      message: 'Would you like to use a template, or build your own?',
      choices: NOTIFICATION_TYPES,
    });
  }

  if (!options.template) {
    questions.push({
      type: 'list',
      name: 'template',
      message: 'which notification template would you like to use?',
      choices: Object.keys(NOTIFICATION_TEMPLATE_OPTIONS).map(key => key),
      default: null,
      when: (responses) => responses.type === NOTIFICATION_TYPES[0],
    });
  }

  if (!options.financialElement) {
    questions.push({
      type: 'list',
      name: 'financialElement',
      message: 'which notification template would you like to use?',
      choices: Object.keys(NOTIFICATION_FINANCIAL_ELEMENTS_OPTIONS).map(key => key),
      default: null,
      when: (responses) => responses.type === NOTIFICATION_TYPES[1],
    });
  }

  if (!options.custom) {
    questions.push({
      type: 'list',
      name: 'custom',
      message: 'which notification template would you like to use?',
      choices: Object.keys(NOTIFICATION_CUSTOM_OPTIONS).map(key => key),
      default: null,
      when: (responses) => responses.type === NOTIFICATION_TYPES[2],
    });
  }

  if (!options.notificationName) {
    questions.push({
      name: 'notificationName',
      message: 'What\'s the template name? (UPPER_CAMEL_CASE)',
      validate: isUpperCase,
      default: '',
    });
  }

  const answers = await inquirer.prompt(questions);

  return {
    ...options,
    notificationName: options.notificationName || answers.notificationName,
    type: options.type || answers.type,
    template: options.template || answers.template,
    financialElement: options.financialElement || answers.financialElement,
    custom: options.custom || answers.custom,
  };
}

export async function getAnwsers(options) {
  return await promptForMissingOptions(options);
}
