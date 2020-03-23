import chalk from "chalk";
import {
  AUTHENTICATION_TYPES,
  getAnwsers,
  HANDLER_TYPES,
} from "./questions";
import fs from 'fs';
import ReplaceInFiles from 'replace-in-files';
import {
  genericCommandHandler,
  addNewCommandToHelp,
  customSymphonyElementsHandler,
  customSymphonyElementsTemplate,
} from "./templates";
import AuthTemplates from './auth-templates';
import { spinnerStart, spinnerError, spinnerStop} from "../../utils/spinner";
import { getXml } from "../../utils/files/utils";
import { toKebabCase } from "../../utils/helper";

export default async (options) => {
  console.log(chalk.bold(
    'This Tool will guide you through the process of adding a new bot command'
  ));

  const awnsers = await getAnwsers(options);
  spinnerStart('Generating Command Handler');
  try {
    const botRoot = options.cwd;
    const pomFilePath = `${botRoot}/pom.xml`;
    const pomXml = fs.readFileSync(pomFilePath);
    const parsedData = await getXml(pomXml);
    const basePackage = parsedData.project.groupId[0];
    const artifactId = parsedData.project.artifactId[0].toLowerCase();
    const javaBasePackage = `${basePackage}.${artifactId}`;
    const completePackagePath = `${botRoot}/src/main/java/${basePackage.split('.').join('/')}/${artifactId}`;

    const botHelpCommandHandlerPath = `${completePackagePath}/command/HelpCommandHandler.java`;
    const botCommandHandlerRootPath = `${completePackagePath}/command/${awnsers.commandName}CommandHandler.java`;
    const botCommandHandlerAuthRootPath = `${completePackagePath}/command/auth`;
    const botSymphonyElementsCommandHandlerPath = `${completePackagePath}/elements/${awnsers.commandName}Handler.java`;
    const botTemplatesRootPath = `${botRoot}/src/main/resources/templates`;

    switch (awnsers.type) {
      case HANDLER_TYPES.REGULAR_COMMAND:
        const genericTemplate = genericCommandHandler(javaBasePackage, awnsers.commandName);
        fs.writeFileSync(botCommandHandlerRootPath, genericTemplate);
        break;
      case HANDLER_TYPES.SYMPHONY_ELEMENTS:
        const templatePath = `${botTemplatesRootPath}/${toKebabCase(awnsers.commandName)}.hbs`;
        const symphElementsHandler = customSymphonyElementsHandler(javaBasePackage, awnsers.commandName, toKebabCase(awnsers.commandName), awnsers.formId);
        const elementsTemplate = customSymphonyElementsTemplate;
        fs.writeFileSync(botSymphonyElementsCommandHandlerPath, symphElementsHandler);
        fs.writeFileSync(templatePath, elementsTemplate);
        break;
      case HANDLER_TYPES.AUTHENTICATION_HANDLER:
        if (awnsers.authType === AUTHENTICATION_TYPES.BASIC) {
          const basicAUthProviderName = `${botCommandHandlerAuthRootPath}/${awnsers.commandName}BasicAuthenticationProvider.java`;
          const template = AuthTemplates[AUTHENTICATION_TYPES.BASIC];
          fs.writeFileSync(botCommandHandlerRootPath, template.command(javaBasePackage, awnsers.commandName));
          fs.writeFileSync(basicAUthProviderName, template.provider(javaBasePackage, awnsers.commandName));
        } else {
          const oAuthAUthProviderName = `${botCommandHandlerAuthRootPath}/${awnsers.commandName}OAuthAuthenticationProvider.java`;
          const oAuthAUthControllerName = `${botCommandHandlerAuthRootPath}/${awnsers.commandName}OAuthController.java`;
          const template = AuthTemplates[AUTHENTICATION_TYPES.OAUTH_V2];
          fs.writeFileSync(botCommandHandlerRootPath, template.command(javaBasePackage, awnsers.commandName));
          fs.writeFileSync(oAuthAUthProviderName, template.provider(javaBasePackage, awnsers.commandName));
          fs.writeFileSync(oAuthAUthControllerName, template.controller(javaBasePackage, awnsers.commandName));
        }
        break;
      default:
        break;
    }

    const helpCommand = {
      files: [ botHelpCommandHandlerPath ],
      from: new RegExp(/private static final String\[\] DESCRIPTIONS \= \{/),
      to: addNewCommandToHelp(awnsers.commandName),
    };

    await ReplaceInFiles(helpCommand);

    spinnerStop(chalk.bold('New command handler  ') + chalk.green.bold('Installed'));
    console.log(chalk.green.bold('Please restart the bot to see the changes in effect'));
  }catch (e) {
    spinnerError('Error');
    console.log(chalk.bold('please mare sure you`re within an bot folder, error: ', e));
  }
};
