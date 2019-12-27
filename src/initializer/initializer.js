import Listr from 'listr';
import { projectInstall } from 'pkg-install';
import chalk from 'chalk';
import {spinnerError, spinnerStart, spinnerStop} from "../../utils/spinner";
const execSync = require('child_process').execSync;

export async function initializeExtensionApp() {
  const tasks = new Listr([
    {
      title: chalk.bold('Installing dependencies'),
      task: () =>
        projectInstall({
          prefer: 'yarn',
          cwd: process.cwd(),
        }),
    },
  ]);
  await tasks.run();
}

export async function initializeBotApp() {
  const tasks = new Listr([
    {
      title: chalk.bold('Ran install dependencies'),
      task: () => {
        execSync('mvn clean install -D skipTests=true');
      }
    },
  ]);
  spinnerStart(chalk.bold('Installing dependencies'));
  await tasks.run().then(function () {
    spinnerStop();
  }).catch(function (err) {
    spinnerError(err);
  });
}
