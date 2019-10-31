import inquirer from "inquirer";
const chalk = require('chalk');

const notEmpty = (value) => value && value.length > 0;

async function promptForMissingOptions(options) {
  console.log(chalk.bold('Please answer the question bellow'));
  const questions = [];

  if (!options.botName) {
    questions.push({
      name: 'botName',
      message: 'What\'s the bot name? (required)',
      validate: notEmpty,
      default: null,
    });
  }

  if (!options.botId) {
    questions.push({
      name: 'botId',
      required: true,
      message: 'What\'s the project bot-id? (required)',
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
      validate: notEmpty,
      default: 'com.symphony.ms',
    });
  }

  if (!options.botUsername) {
    questions.push({
      name: 'botUsername',
      message: 'What\'s the bot username in symphony portal? (required)',
      validate: notEmpty,
      default: null,
    });
  }

  if (!options.applicationId) {
    questions.push({
      name: 'applicationId',
      message: 'do you have an extension app?, if so what is the application ID in Symphony portal?',
      default: null,
    });
  }
  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    botName: options.botName || answers.botName,
    botId: options.botId || answers.botId,
    botServiceEmail: options.botServiceEmail || answers.botServiceEmail,
    basePackage: options.basePackage || answers.basePackage,
    botUsername: options.botUsername || answers.botUsername,
    applicationId: options.applicationId || answers.applicationId,
  };
}

export async function getAnwsers(options) {
  return await promptForMissingOptions(options);
};
