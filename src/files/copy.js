import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import {repoPath} from "../../utils/constants";

const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false,
  });
}

export async function createExtensionApp(options) {
  options = {
    ...options,
    targetDirectory: process.cwd(),
  };

  const templateDir = path.resolve(repoPath);
  options.templateDirectory = templateDir;

  console.log('Where to copy, from',process.cwd(), templateDir);

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.error('%s Invalid template name', chalk.red.bold('ERROR'));
    process.exit(1);
  }

  console.log('Copy project files', options);
  await copyTemplateFiles(options);

  console.log('%s Project ready', chalk.green.bold('DONE'));
  return true;
}
