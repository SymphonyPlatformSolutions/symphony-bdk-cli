import inquirer from "inquirer";
const chalk = require('chalk');
import { notEmpty } from "../../utils/helper";

async function promptForMissingOptions(options) {
  console.log(chalk.bold('Please answer the question bellow'));
  const questions = [];
  if (!options.projectName) {
    questions.push({
      name: 'projectName',
      message: 'What\'s the project name(required)?',
      validate: notEmpty,
      default: null,
    });
  }

  if (!options.appId) {
    questions.push({
      name: 'appId',
      message: 'What\'s the app Id(required)?',
      validate: notEmpty,
      default: null,
    });
  }

  if (!options.publisher) {
    questions.push({
      name: 'publisher',
      message: 'What\'s your company name?(required)?',
      validate: notEmpty,
      default: null,
    });
  }

    if (!options.description) {
    questions.push({
      name: 'description',
      message: 'Please give a brief description of this extension app',
      default: null,
    });
  }

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    projectName: options.projectName || answers.projectName,
    appId: options.appId || answers.appId,
    publisher: options.publisher || answers.publisher,
    description: options.description || answers.description,
  };
}

export async function getAnwsers(options) {
  return await promptForMissingOptions(options);
}
