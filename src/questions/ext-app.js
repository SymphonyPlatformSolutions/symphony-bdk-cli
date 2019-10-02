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

  if (!options.description) {
    questions.push({
      name: 'description',
      message: 'What\'s the project description?',
      default: null,
    });
  }

  if (!options.githubUrl) {
    questions.push({
      name: 'githubUrl',
      message: 'What\'s the github project url?',
      default: null,
    });
  }

  if (!options.issueUrl) {
    questions.push({
      name: 'issueUrl',
      message: 'What\'s the issue project url?',
      default: null,
    });
  }

  if (!options.author) {
    questions.push({
      name: 'author',
      message: 'What\'s the author name?',
      default: null,
    });
  }

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    projectName: options.projectName || answers.projectName,
    description: options.description || answers.description,
    githubUrl: options.githubUrl || answers.githubUrl,
    issueUrl: options.issueUrl || answers.issueUrl,
    author: options.author || answers.author,
  };
}

export async function getAnwsers(options) {
  return await promptForMissingOptions(options);
}
