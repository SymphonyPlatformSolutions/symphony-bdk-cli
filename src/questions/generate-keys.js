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

  if (!options.privateKeyName) {
    questions.push({
      name: 'privateKeyName',
      message: 'What\'s the private key name [privatekey]?',
      default: 'privatekey',
    });
  }

  if (!options.publicKeyName) {
    questions.push({
      name: 'publicKeyName',
      message: 'What\'s the public key name [publickey]?',
      default: 'publickey',
    });
  }

  if (!options.countryCode) {
    questions.push({
      name: 'countryCode',
      message: 'What\'s the cert country code ?',
      default: '',
    });
  }

  if (!options.stateProvince) {
    questions.push({
      name: 'stateProvince',
      message: 'What\'s the cert state province?',
      default: '',
    });
  }

  if (!options.locality) {
    questions.push({
      name: 'locality',
      message: 'What\'s the cert city/locality?',
      default: '',
    });
  }

  if (!options.organizationName) {
    questions.push({
      name: 'organizationName',
      message: 'What\'s the cert Organization Name?',
      default: '',
    });
  }

  if (!options.organizationUnit) {
    questions.push({
      name: 'organizationUnit',
      message: 'What\'s the cert Organization Unit?',
      default: '',
    });
  }

  if (!options.commonName) {
    questions.push({
      name: 'commonName',
      message: 'What\'s the cert Common Name?',
      default: '',
    });
  }

  if (!options.emailAddress) {
    questions.push({
      name: 'emailAddress',
      message: 'What\'s the cert email address?',
      default: '',
    });
  }

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    botId: options.botI || answers.botId,
    privateKeyName: options.privateKeyName || answers.privateKeyName,
    publicKeyName: options.publicKeyName || answers.publicKeyName,
    countryCode: options.countryCode || answers.countryCode,
    stateProvince: options.stateProvince || answers.stateProvince,
    locality: options.locality || answers.locality,
    organizationName: options.organizationName || answers.organizationName,
    organizationUnit: options.organizationUnit || answers.organizationUnit,
    commonName: options.commonName || answers.commonName,
    emailAddress: options.emailAddress || answers.emailAddress,

  };
}

export async function getAnwsers(options) {
  return await promptForMissingOptions(options);
}
