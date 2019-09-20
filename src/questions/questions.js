import inquirer from "inquirer";
const chalk = require('chalk');

async function promptForMissingOptions(options) {
  console.log(chalk.bold('Please answer the question bellow'));
  const questions = [];
  if (!options.projectName) {
    questions.push({
      name: 'projectName',
      message: 'What\'s the project name?',
      default: null,
    });
  }

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    projectName: options.projectName || answers.projectName,
  };
}

export async function getVariableValues(options) {
  return await promptForMissingOptions(options);
}
