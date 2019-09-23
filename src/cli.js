import { getCommands } from "./commands/commands";
import { getVariableValues } from "./questions/questions";
import {gitFlow} from "./git/git";
import {deleteFolder} from "./files/utils";
import {local} from "../utils/constants";
import {initializeProject} from "./initializer/initializer";
import chalk from "chalk";
import {filesFlow} from "./files/files";

export async function cli(args) {
  console.log(chalk.bold('This template will guide you through the process to create an extension app template'));
  let options = getCommands(args);
  options = await getVariableValues(options);
  deleteFolder(local);
  await gitFlow();
  await filesFlow(options);
  await initializeProject();
  deleteFolder(local);
  console.log(chalk.bold('Project ready %s'), chalk.green.bold('DONE'));
}
