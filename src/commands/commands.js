export const COMMANDS = {
  CREATE_EXT_APP: 0,
  CREATE_BOT: 1,
  CREATE_CERTIFICATE: 2,
}

const commander = require('commander');
const program = new commander.Command();
program.version('0.0.1');

// Available Commands
program
  .option('--create-extension-app','createExtensionApp', false)
  .option('--create-bot', 'createBot', false)
  .option('--generate-certificates', 'generateCertificates', false);

var commands;

const getCommand = (options) => {
  return options.createExtensionApp
    ? COMMANDS.CREATE_EXT_APP
    : options.createBot
      ? COMMANDS.CREATE_BOT
      : options.generateCertificates
        ? COMMANDS.CREATE_CERTIFICATE
        : -1;
};

const parseResponse = (args) => {
  let options = program.parse(args);
  commands = {
    ...commands,
    command: getCommand(options),
    program: program,
    cwd: process.cwd(),
  };
  return commands
};

//Interface with CLI
export const getCommands = (args) => {
  return parseResponse(args);
};
