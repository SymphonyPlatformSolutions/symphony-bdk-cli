import chalk from "chalk";
import { getAnwsers } from "../questions/ext-app";
import {gitFlow} from "../git/git";
import {deleteFolder} from "../files/utils";
import {local} from "../../utils/constants";
import {initializeProject} from "../initializer/initializer";
import {filesFlow} from "../files/files";
import fs from 'fs';

const createExtensionApp = async (options) => {
  console.log(chalk.bold('This template will guide you through the process to create an extension app template'));
    const awnsers = await getAnwsers(options);
    const targetFolder = `${options.cwd}/${awnsers.projectName}`;
    fs.existsSync(targetFolder) || fs.mkdirSync(targetFolder);
    process.chdir(targetFolder);
    deleteFolder(local);
    await gitFlow();
    await filesFlow(awnsers);
    await initializeProject();
    deleteFolder(local);
    console.log(chalk.bold('Project ready %s'), chalk.green.bold('DONE'));
};

export default createExtensionApp;
