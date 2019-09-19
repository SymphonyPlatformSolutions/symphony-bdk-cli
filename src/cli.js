import { getCommands } from "./commands/commands";
import { getVariableValues } from "./questions/questions";
import {gitFlow} from "./git/git";
import {createExtensionApp} from "./files/copy";

export async function cli(args) {
  let options = getCommands(args);
  options = await getVariableValues(options);
  console.log(options);
  await gitFlow();
  await createExtensionApp(options);
}
