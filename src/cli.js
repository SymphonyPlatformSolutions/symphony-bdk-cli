import { getCommands } from "./commands/commands";
import { getVariableValues } from "./questions/questions";
import {gitFlow} from "./git/git";
import {createExtensionApp} from "./files/copy";
import {deleteFolder} from "./files/utils";
import {local} from "../utils/constants";
import {initializeProject} from "./initializer/initializer";
import chalk from "chalk";

export async function cli(args) {
  console.log(chalk.bold('This template will guide you through the process to create an extension app template'));
  let options = getCommands(args);
  options = await getVariableValues(options);
  deleteFolder(local);
  await gitFlow();
  await createExtensionApp(options);
  await initializeProject();
  deleteFolder(local);
  console.log(chalk.bold('Project ready %s'), chalk.green.bold('DONE'));
}
