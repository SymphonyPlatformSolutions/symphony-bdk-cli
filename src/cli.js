import {COMMANDS, getCommands} from "./commands/commands";
import createExtensionApp from "./commands/create-ext-app";
import createBot from "./commands/create-bot";
import generateKeys from "./commands/generate-keys";
import path from 'path';

const terminalImage = require('terminal-image');

const init = async (args) => {
  let options = getCommands(args);
  switch (options.command) {
    case COMMANDS.CREATE_EXT_APP:
      console.log(await terminalImage.file(path.resolve(__dirname, './assets/logo-symphony.png')));
      createExtensionApp(options);
      break;
    case COMMANDS.CREATE_BOT:
      createBot(options);
      break;
    case COMMANDS.CREATE_CERTIFICATE:
      console.log(await terminalImage.file(path.resolve(__dirname, './assets/logo-symphony.png')));
      generateKeys(options);
      break;
    default:
      options.program.outputHelp();
      break;
  }
};

module.exports =  init;
