export const COMMANDS = {
  CREATE_EXT_APP: 0,
  CREATE_BOT: 1,
  CREATE_CERTIFICATE: 2,
  CHECK_DEPS: 3,
  TOOLBOX: 4,
  CREATE_APP_NOTIFICATION: 5,
};

export const TEMPLATE_COMMANDS = {
  NOTIFICATION: 'message-template',
  HANDLER: 'command-handler',
};

const commander = require('commander');
const program = new commander.Command();
program.version('0.0.1')

// Available Commands
program
  .description('This tool helps to generate bots and extension apps as well as the proper RSA files used by a symphony \n' +
    'bot account ')
  .option('--app [action]','Creates an extension app boilerplate, add "message-template" as an argument, to add a new message template', false)
  .option('--bot [action]', 'Creates a Symphony bot application, add "command-handler" as an argument to add a new Command to your bot', false)
  .option('--toolbox', 'Launches the toolbox-ui library on http://localhost:6006', false)
  .option('--run', 'Starts the newly created project when used with --app and --bot ', false)
  .option('--gen-certs', 'Generates they RSA key pair and outputs a valid JWT token for immediate testing', false)
  .option('--check-deps', 'Checks if the system has all the required dependencies to run the project', false);

var commands;

const getCommand = (options) => {
  return options.toolbox
      ? COMMANDS.TOOLBOX
      : options.app
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
    app: options.app,
    bot: options.bot,
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
