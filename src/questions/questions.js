import inquirer from "inquirer";
const chalk = require('chalk');

async function promptForMissingOptions(options) {
  const defaultTemplate = 'JavaScript';
  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || defaultTemplate,
    };
  }

  const questions = [];

  console.log(chalk.blue('This template will guide you through the process to create an extension app template'));
  console.log(chalk.blue('Please answer the question bellow'));

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
