import {COMMANDS, getCommands} from "./commands/commands";
import createExtensionApp from "./commands/create-ext-app";
import createBot from "./commands/create-bot";
import generateKeys from "./commands/generate-keys";
import checkDeps from "./commands/check-deps";
import path from 'path';
import launchToolbox from "./commands/launch-toolbox";

const terminalImage = require('terminal-image');

const init = async (args) => {
  let options = getCommands(args);

  if (!checkDeps(options)) {
    return;
  }
  switch (options.command) {
    case COMMANDS.CREATE_EXT_APP:
      console.log(await terminalImage.file(path.resolve(__dirname, './assets/logo-symphony.png')));
      createExtensionApp(options);
      break;
    case COMMANDS.CREATE_BOT:
      console.log(await terminalImage.file(path.resolve(__dirname, './assets/logo-symphony.png')));
      createBot(options);
      break;
    case COMMANDS.CREATE_CERTIFICATE:
      console.log(await terminalImage.file(path.resolve(__dirname, './assets/logo-symphony.png')));
      generateKeys(options);
      break;
      case COMMANDS.CHECK_DEPS:
      console.log(await terminalImage.file(path.resolve(__dirname, './assets/logo-symphony.png')));
      checkDeps(options);
      break;
    case COMMANDS.TOOLBOX:
      console.log(await terminalImage.file(path.resolve(__dirname, './assets/logo-symphony.png')));
      checkDeps(options);
      launchToolbox();
      break;
    default:
      options.program.outputHelp();
      break;
  }
};

module.exports =  init;
