import {deleteFolderRecursive} from "../../utils/files/utils";

const execSync = require('child_process').execSync;
import chalk from "chalk";
import {gitFlow} from "../../utils/git/git";
import mkdirp from 'mkdirp';
import fs from 'fs';
import {spinnerStart, spinnerStop} from "../../utils/spinner";


const repoUrl = "SymphonyPlatformSolutions/symphony-bdk-ui-toolkit#develop";

const cliFolderPath = (`${process.env.HOME}/.symphony-bdk-cli`);
const toolboxPath = `${cliFolderPath}/toolbox`;

const launchToolbox = async (options) => {
  spinnerStart('Launching latest ui-toolkit Library\n');
  deleteFolderRecursive(cliFolderPath);
  mkdirp.sync(toolboxPath);
  process.chdir(toolboxPath);

  if (fs.existsSync(`${toolboxPath}/package.json`)) {
    console.log(chalk.bold('Installing dependencies'));
    execSync('yarn',{stdio: 'inherit'});
    spinnerStop('Launching Toolkit!');
    execSync('yarn storybook',{stdio: 'inherit'});
  } else {
     // process.chdir('../');
     console.log(chalk.bold('Getting Latest Toolkit ui'));
     await gitFlow(repoUrl, toolboxPath);
     process.chdir(toolboxPath);
     console.log(chalk.bold('Installing dependencies'));
      execSync('yarn', {stdio: 'inherit'});
      spinnerStop('Launching Toolkit!');
      execSync('yarn storybook',{stdio: 'inherit'});
  }
};

export default launchToolbox;
