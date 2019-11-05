import inquirer from "inquirer";
const chalk = require('chalk');
import { notEmpty, validJavaPackage } from "../../utils/helper";

async function promptForMissingOptions(options) {
  console.log(chalk.bold('Please answer the question bellow'));
  const questions = [];

  if (!options.projectName) {
    questions.push({
      name: 'projectName',
      message: 'What\'s the bot project name? (required)',
      validate: notEmpty,
      default: null,
    });
  }

  if (!options.botUsername) {
    questions.push({
      name: 'botUsername',
      message: 'What\'s the bot username? (required)',
      validate: notEmpty,
      default: null,
    });
  }

  if (!options.botServiceEmail) {
    questions.push({
      name: 'botServiceEmail',
      message: 'What\'s the bot service email? (required)',
      validate: notEmpty,
      default: null,
    });
  }

  if (!options.basePackage) {
    questions.push({
      name: 'basePackage',
      message: 'What\'s the Base Package? (required)',
      validate: validJavaPackage,
      default: 'com.symphony.ms',
    });
  }

  if (!options.applicationId) {
    questions.push({
      name: 'applicationId',
      message: 'do you have an extension app?, if so what is the application ID in Symphony portal?',
      default: '',
    });
  }

   if (!options.podAddress) {
    questions.push({
      name: 'podAddress',
      message: 'Please Provide the Pod Address this bot will serve',
      default: 'psdev.symphony.com',
    });
  }
  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    projectName: options.projectName || answers.projectName,
    botServiceEmail: options.botServiceEmail || answers.botServiceEmail,
    basePackage: options.basePackage || answers.basePackage,
    botUsername: options.botUsername || answers.botUsername,
    applicationId: options.applicationId || answers.applicationId,
    podAddress: options.podAddress || answers.podAddress,
  };
}

export async function getAnwsers(options) {
  return await promptForMissingOptions(options);
};
