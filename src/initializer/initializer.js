import Listr from 'listr';
import { projectInstall } from 'pkg-install';

export async function initializeProject() {
  const tasks = new Listr([
    {
      title: 'Install dependencies',
      task: () =>
        projectInstall({
          cwd: process.cwd(),
        }),
    },
  ]);
  await tasks.run();
}
