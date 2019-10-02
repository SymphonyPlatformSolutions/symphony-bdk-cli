import inquirer from "inquirer";
const chalk = require('chalk');

async function promptForMissingOptions(options) {
  console.log(chalk.bold('Please answer the question bellow'));
  const questions = [];

  if (!options.botName) {
    questions.push({
      name: 'botName',
      message: 'What\'s the bot name?',
      default: null,
    });
  }

  if (!options.botId) {
    questions.push({
      name: 'botId',
      message: 'What\'s the project bot-id?',
      default: null,
    });
  }
  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    botName: options.botName || answers.botName,
    botId: options.botId || answers.botId,
  };
}

export async function getAnwsers(options) {
  return await promptForMissingOptions(options);
}
