import { getCommands } from "./commands/commands";
import { getVariableValues } from "./questions/questions";
import {getTemplateProject} from "./git/clone";

export async function cli(args) {
  let options = getCommands(args);
  options = await getVariableValues(options);
  console.log(options);
  getTemplateProject();
}
