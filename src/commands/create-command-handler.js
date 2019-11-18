import chalk from "chalk";
import {
  getAnwsers, SYMPHONY_ELEMENTS_HANDLER_TYPES,
} from "../questions/create-command-handler";
import fs from 'fs';
import ReplaceInFiles from 'replace-in-files';
import {
  genericCommandHandler,
  addNewCommandToHelp,
  formBuilderSymphonyElementsHandler,
  customSymphonyElementsHandler,
  customSymphonyElementsTemplate,
} from "../assets/command-handler";
import { spinnerStart, spinnerError, spinnerStop} from "../../utils/spinner";
import {getXml} from "../files/utils";

const createCommandHandler = async (options) => {
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
    const botHelpCommandHandlerPath = `${botRoot}/src/main/java/${basePackage.split('.').join('/')}/${artifactId}/command/HelpCommandHandler.java`;
    const botCommandHandlerRootPath = `${botRoot}/src/main/java/${basePackage.split('.').join('/')}/${artifactId}/command/${awnsers.commandName}CommandHandler.java`;
    const botSymphonyElementsCommandHandlerPath = `${botRoot}/src/main/java/${basePackage.split('.').join('/')}/${artifactId}/elements/${awnsers.commandName}Handler.java`;
    const botTemplatesRootPath = `${botRoot}/src/main/resources/templates`;

    switch (awnsers.elementType) {
      case SYMPHONY_ELEMENTS_HANDLER_TYPES.SIMPLE_FORM_BUILDER:
         const simpleFormBuilder = formBuilderSymphonyElementsHandler(javaBasePackage, awnsers.commandName, awnsers.formId);
         fs.writeFileSync(botSymphonyElementsCommandHandlerPath, simpleFormBuilder);
        break;
      case SYMPHONY_ELEMENTS_HANDLER_TYPES.CUSTOM_TEMPLATE:
         const templatePath = `${botTemplatesRootPath}/${awnsers.commandName.toLowerCase()}.ftl`;
         const symphElementsHandler = customSymphonyElementsHandler(javaBasePackage, awnsers.commandName, awnsers.formId);
         const elementsTemplate = customSymphonyElementsTemplate;
         fs.writeFileSync(botSymphonyElementsCommandHandlerPath, symphElementsHandler);
         fs.writeFileSync(templatePath, elementsTemplate);
        break;
      default:
          const genericTemplate = genericCommandHandler(javaBasePackage, awnsers.commandName);
          fs.writeFileSync(botCommandHandlerRootPath, genericTemplate);
        break;
    }

    const helpCommand = {
      files: [ botHelpCommandHandlerPath ],
      from: new RegExp(/\/login \- returns the HTTP authorization header required to talk to external system\"\,/),
      to: addNewCommandToHelp(awnsers.commandName),
    };

    await ReplaceInFiles(helpCommand);

    spinnerStop(chalk.bold('New command handler  ') + chalk.green.bold('Installed'));
  }catch (e) {
    spinnerError('Error');
    console.log(chalk.bold('please mare sure you`re within an bot folder, error: ', e));
  }
};

export default createCommandHandler;
