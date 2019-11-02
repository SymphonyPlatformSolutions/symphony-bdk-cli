export const COMMANDS = {
  CREATE_EXT_APP: 0,
  CREATE_BOT: 1,
  CREATE_CERTIFICATE: 2,
  CHECK_DEPS: 3,
  TOOLBOX: 4,
}

const commander = require('commander');
const program = new commander.Command();
program.version('0.0.1')

// Available Commands
program
  .description('This tool helps to generate the proper RSA files to be used on symphony \n' +
    'and also, helps the fast creation of bots and extension apps')
  .option('--ext','Creates an extension app boilerplate', false)
  .option('--bot', 'Creates an Symphony bot application', false)
  .option('--toolbox', 'Launches the Market Soltuons toolbox-ui library on http://localhost:6006', false)
  .option('--run', 'To be used along side --ext or --bot, it starts the project', false)
  .option('--gen-certs', 'Generates they RSA key pair and outputs a valid JWT token for immediate testing', false)
  .option('--check-deps', 'Checks if the system has all the required dependencies to run this project', false);

var commands;

const getCommand = (options) => {
  return options.toolbox ? COMMANDS.TOOLBOX :
      options.ext
    ? COMMANDS.CREATE_EXT_APP
    : options.bot
      ? COMMANDS.CREATE_BOT
      : options.genCerts
        ? COMMANDS.CREATE_CERTIFICATE
        : options.checkDeps
          ? COMMANDS.CHECK_DEPS
          : -1;
};

const parseResponse = (args) => {
  let options = program.parse(args);
  commands = {
    ...commands,
    command: getCommand(options),
    program: program,
    run: options.run,
    cwd: process.cwd(),
  };
  return commands
};

//Interface with CLI
export const getCommands = (args) => {
  return parseResponse(args);
};
