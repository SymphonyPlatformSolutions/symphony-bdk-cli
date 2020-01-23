import {deleteFolderRecursive} from "../../utils/files/utils";

const execSync = require('child_process').execSync;
import chalk from "chalk";
import {gitFlow} from "../../utils/git/git";
import mkdirp from 'mkdirp';
import fs from 'fs';
import {spinnerStart, spinnerStop} from "../../utils/spinner";


const repoUrl = "git@github.com:SymphonyPlatformSolutions/sms-sdk-toolbox-ui.git";
const repoBranch = 'refs/remotes/origin/develop';

const cliFolderPath = (`${process.env.HOME}/.sms-sdk-cli`);
const toolboxPath = `${cliFolderPath}/.tmp`;

const launchToolbox = async (options) => {
  spinnerStart('Launching latest toolbox-ui Library\n');
  deleteFolderRecursive(toolboxPath);
  mkdirp.sync(toolboxPath);
  process.chdir(toolboxPath);

    if (fs.existsSync(`${toolboxPath}/package.json`)) {
      console.log(chalk.bold('Installing dependencies'));
      execSync('yarn',{stdio: 'inherit'});
      spinnerStop('Launching Toolbox!');
      execSync('yarn storybook',{stdio: 'inherit'});
    } else {
       process.chdir('../');
       console.log(chalk.bold('Getting Latest Toolbox ui'));
       await gitFlow(repoUrl, repoBranch);
       process.chdir(toolboxPath);
       console.log(chalk.bold('Installing dependencies'));
        execSync('yarn', {stdio: 'inherit'});
        spinnerStop('Launching Toolbox!');
        execSync('yarn storybook',{stdio: 'inherit'});
    }
};

export default launchToolbox;
