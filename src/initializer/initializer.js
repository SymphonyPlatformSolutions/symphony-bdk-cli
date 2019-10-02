import Listr from 'listr';
import { projectInstall } from 'pkg-install';
import chalk from 'chalk';
const execSync = require('child_process').execSync;

export async function initializeExtensionApp() {
  const tasks = new Listr([
    {
      title: chalk.bold('Installing dependencies'),
      task: () =>
        projectInstall({
          cwd: process.cwd(),
        }),
    },
  ]);
  await tasks.run();
}

export async function initializeBotApp() {
  const tasks = new Listr([
    {
      title: chalk.bold('Installing dependencies'),
      task: () => {
        execSync('mvn clean install -DskipTests=true');
      }
    },
  ]);
  await tasks.run();
}
