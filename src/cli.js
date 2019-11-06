import {COMMANDS, EXT_APP_COMMANDS, getCommands} from "./commands/commands";
import createExtensionApp from "./commands/create-ext-app";
import createBot from "./commands/create-bot";
import generateKeys from "./commands/generate-keys";
import checkDeps from "./commands/check-deps";
import path from 'path';
import launchToolbox from "./commands/launch-toolbox";
import fs from 'fs';
import createNotification from "./commands/create-notification";

const terminalImage = require('terminal-image-resizeable');

const init = async (args) => {
  let options = getCommands(args);
  const imageBuffer = fs.readFileSync(path.resolve(__dirname,'./assets/logo-symphony.png'));

  if (!checkDeps(options)) {
    return;
  }
  switch (options.command) {
    case COMMANDS.CREATE_EXT_APP:
      console.log(await terminalImage.buffer(imageBuffer, 64,30));

      if (options.app === true) {
        createExtensionApp(options);
      } else if(options.app === EXT_APP_COMMANDS.NOTIFICATION) {
        createNotification(options);
      } else {
        options.program.outputHelp();
      }

      break;
    case COMMANDS.CREATE_BOT:
      console.log(await terminalImage.buffer(imageBuffer, 64, 30));
      createBot(options);
      break;
    case COMMANDS.CREATE_CERTIFICATE:
      console.log(await terminalImage.buffer(imageBuffer, 64, 30));
      generateKeys(options);
      break;
      case COMMANDS.CHECK_DEPS:
      console.log(await terminalImage.buffer(imageBuffer, 64, 30));
      checkDeps(options);
      break;
    case COMMANDS.TOOLBOX:
      console.log(await terminalImage.buffer(imageBuffer, 64, 30));
      checkDeps(options);
      launchToolbox();
      break;
    default:
      options.program.outputHelp();
      break;
  }
};

module.exports =  init;
