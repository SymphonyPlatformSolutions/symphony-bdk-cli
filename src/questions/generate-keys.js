import inquirer from "inquirer";
const chalk = require('chalk');

async function promptForMissingOptions(options) {
  console.log(chalk.bold('Please answer the question bellow'));
  const questions = [];

  if (!options.botId) {
    questions.push({
      name: 'botId',
      message: 'What\'s the project bot-id?',
      default: null,
    });
  }

  if (!options.botEmailAddress) {
    questions.push({
      name: 'botEmailAddress',
      message: 'What\'s the private key name?',
      default: 'botEmailAddress',
    });
  }

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    botId: options.botI || answers.botId,
    botEmailAddress: options.botEmailAddress || answers.botEmailAddress,
  };
}

export async function getAnwsers(options) {
  return await promptForMissingOptions(options);
}
