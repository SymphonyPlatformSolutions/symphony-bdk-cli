import inquirer from "inquirer";
const chalk = require('chalk');
import {notEmpty} from "../../utils/helper";

const HANDLER_TYPES = [
 'Regular command',
 'Symphony Elements',
];

export const SYMPHONY_ELEMENTS_HANDLER_TYPES = {
  SIMPLE_FORM_BUILDER: 'FORM_BUILDER',
  CUSTOM_TEMPLATE: 'CUSTOM_TEMPLATE',
};

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

  if (!options.elementType) {
    questions.push({
      type: 'list',
      name: 'elementType',
      message: 'Would you like a Simple form using the Form Builder, or a  more complex Custom Form with a template?',
      choices: Object.keys(SYMPHONY_ELEMENTS_HANDLER_TYPES).map(key => SYMPHONY_ELEMENTS_HANDLER_TYPES[key]),
      when: (responses) => responses.type === HANDLER_TYPES[1],
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
    elementType: options.elementType || answers.elementType,
    formId: options.formId || answers.formId,
  };
}

export async function getAnwsers(options) {
  return await promptForMissingOptions(options);
}
