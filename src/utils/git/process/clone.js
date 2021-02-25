'use strict';
import chalk from "chalk";
import {spinnerError, spinnerStart, spinnerStop} from "../../spinner";
import download from 'download-git-repo';

export async function getTemplateProject(repoUrl, absoluteTargetFolder) {
  spinnerStart(chalk.bold('Getting latest boilerplate application'));
  try {
    await new Promise((Resolve, Reject) => {
      download(repoUrl, absoluteTargetFolder, { clone: false }, function (err) {
      if (err) {
        console.log(err);
        spinnerError(err);
        Reject(err)
      } else {
        spinnerStop(chalk.bold('Boilerplate ') + chalk.green.bold("accessed"));
        Resolve();
      }
    })
    });
  }
  catch(e) {
    throw new Error(e);
  }
}
