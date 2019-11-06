import inquirer from "inquirer";
const chalk = require('chalk');

async function promptForMissingOptions(options) {
  console.log(chalk.bold('Please answer the following questions'));
  const questions = [];

  if (!options.projectName) {
    questions.push({
      name: 'projectName',
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
    projectName: options.botI || answers.projectName,
    botEmailAddress: options.botEmailAddress || answers.botEmailAddress,
  };
}

export async function getAnwsers(options) {
  return await promptForMissingOptions(options);
}
