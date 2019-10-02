import {COMMANDS, getCommands} from "./commands/commands";
import createExtensionApp from "./commands/create-ext-app";
import createBot from "./commands/create-bot";
import generateKeys from "./commands/generate-keys";
import checkDeps from "./commands/check-deps";
import path from 'path';

const terminalImage = require('terminal-image');

const init = async (args) => {
  let options = getCommands(args);
  switch (options.command) {
    case COMMANDS.CREATE_EXT_APP:
      console.log(await terminalImage.file(path.resolve(__dirname, './assets/logo-symphony.png')));
      checkDeps() && createExtensionApp(options);
      break;
    case COMMANDS.CREATE_BOT:
      checkDeps() && createBot(options);
      break;
    case COMMANDS.CREATE_CERTIFICATE:
      console.log(await terminalImage.file(path.resolve(__dirname, './assets/logo-symphony.png')));
      checkDeps() && generateKeys(options);
      break;
      case COMMANDS.CHECK_DEPS:
      console.log(await terminalImage.file(path.resolve(__dirname, './assets/logo-symphony.png')));
      checkDeps(options);
      break;
    default:
      options.program.outputHelp();
      break;
  }
};

module.exports =  init;
