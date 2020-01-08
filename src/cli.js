import {COMMANDS, TEMPLATE_COMMANDS, getCommands} from "./commands";
import createExtensionApp from "./commands/create-ext-app";
import createBot from "./commands/create-bot";
import generateKeys from "./commands/generate-keys";
import checkDeps from "./commands/check-deps";
import path from 'path';
import launchToolbox from "./commands/misc/launch-toolbox";
import fs from 'fs';
import createNotification from "./commands/create-notification";
import createCommandHandler from "./commands/create-command-handler";

const terminalImage = require('terminal-image');

const init = async (args) => {
  let options = getCommands(args);
  const imageBuffer = fs.readFileSync(path.resolve(__dirname,'./assets/logo-symphony.png'));
  console.log(await terminalImage.file(path.resolve(__dirname, './assets/logo-symphony.png')));

  if (!checkDeps(options)) {
    return;
  }
  switch (options.command) {
    case COMMANDS.CREATE_EXT_APP:

      if (options.app === true) {
        await createExtensionApp(options);
      } else if(options.app === TEMPLATE_COMMANDS.NOTIFICATION) {
        await createNotification(options);
      } else {
        options.program.outputHelp();
      }

      break;
    case COMMANDS.CREATE_BOT:
      if (options.bot === true) {
        await createBot(options);
      } else if(options.bot === TEMPLATE_COMMANDS.HANDLER) {
        await createCommandHandler(options);
      } else {
        options.program.outputHelp();
      }
      break;
    case COMMANDS.CREATE_CERTIFICATE:
      await generateKeys(options);
      break;
      case COMMANDS.CHECK_DEPS:
      await checkDeps(options);
      break;
    case COMMANDS.TOOLBOX:
      await checkDeps(options);
      await launchToolbox();
      break;
    default:
      options.program.outputHelp();
      break;
  }
};

module.exports =  init;
