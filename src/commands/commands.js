const commander = require('commander');
const program = new commander.Command();
program.version('0.0.1');

//Add posible values of command
program
  .option('--create-extension-app','createExtensionApp', false)

//Parse response into an object
var commands;
const parseResponse = (args) => {
  let options = program.parse(args);
  commands = {
    ...commands,
    createExtensionApp: options.createExtensionApp
  }
  return commands
}

//Interface with CLI
export const getCommands = (args) => {
  return parseResponse(args);
}
