import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import {repoPath} from "../../utils/constants";
import {spinnerError, spinnerStart, spinnerStop} from "../../utils/spinner";

const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false,
  });
}

export async function createExtensionApp(options) {
  spinnerStart(chalk.bold('Coping files'));
  options = {
    ...options,
    targetDirectory: process.cwd(),
  };

  const templateDir = path.resolve(repoPath);
  options.templateDirectory = templateDir;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    spinnerError('%s Invalid template name', chalk.red.bold('ERROR'));
    process.exit(1);
  }

  await copyTemplateFiles(options);
  spinnerStop(chalk.bold('Files ') + chalk.green.bold('COPIED'));
  return true;
}
