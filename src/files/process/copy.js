import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import {repoPath} from "../../../utils/constants";
import {spinnerError, spinnerStart, spinnerStop} from "../../../utils/spinner";
import {copyFiles, deleteFolderRecursive, deleteFileSync} from "../utils";

const access = promisify(fs.access);

export async function createExtensionApp(options) {
  spinnerStart(chalk.bold('Moving bits and bytes'));
  options = {
    ...options,
    targetDirectory: process.cwd(),
  };

  const templateDir = path.resolve(repoPath);
  options.templateDirectory = templateDir;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    spinnerError('%s Invalid boilerplate name', chalk.red.bold('ERROR'));
    process.exit(1);
  }

  await copyFiles(options.templateDirectory, options.targetDirectory);
  deleteFolderRecursive(`${options.targetDirectory}/.git`);
  deleteFileSync(`${options.targetDirectory}/.gitignore`);
  spinnerStop(chalk.bold('Files ') + chalk.green.bold('Installed'));
  return true;
}

export async function createBotApp(options) {
  spinnerStart(chalk.bold('Moving bits and bytes'));
  options = {
    ...options,
    targetDirectory: process.cwd(),
  };

  const templateDir = path.resolve(repoPath);
  options.templateDirectory = templateDir;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    spinnerError('%s Invalid boilerplate name', chalk.red.bold('ERROR'));
    process.exit(1);
  }

  await copyFiles(options.templateDirectory, options.targetDirectory);
  deleteFolderRecursive(`${options.targetDirectory}/.git`);
  deleteFileSync(`${options.targetDirectory}/.gitignore`);
  spinnerStop(chalk.bold('Boilerplate ') + chalk.green.bold('Installed'));
  return true;

}
