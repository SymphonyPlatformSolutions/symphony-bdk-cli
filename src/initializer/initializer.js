import Listr from 'listr';
import { projectInstall } from 'pkg-install';
import chalk from 'chalk';

export async function initializeProject() {
  const tasks = new Listr([
    {
      title: chalk.bold('Install dependencies'),
      task: () =>
        projectInstall({
          cwd: process.cwd(),
        }),
    },
  ]);
  await tasks.run();
}
