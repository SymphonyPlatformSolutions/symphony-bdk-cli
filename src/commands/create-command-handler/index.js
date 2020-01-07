import chalk from "chalk";
import {
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
import { spinnerStart, spinnerError, spinnerStop} from "../../utils/spinner";
import {getXml} from "../../utils/files/utils";

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
    const botHelpCommandHandlerPath = `${botRoot}/src/main/java/${basePackage.split('.').join('/')}/${artifactId}/command/HelpCommandHandler.java`;
    const botCommandHandlerRootPath = `${botRoot}/src/main/java/${basePackage.split('.').join('/')}/${artifactId}/command/${awnsers.commandName}CommandHandler.java`;
    const botSymphonyElementsCommandHandlerPath = `${botRoot}/src/main/java/${basePackage.split('.').join('/')}/${artifactId}/elements/${awnsers.commandName}Handler.java`;
    const botTemplatesRootPath = `${botRoot}/src/main/resources/templates`;

    if (awnsers.type === HANDLER_TYPES[0]) {
      const genericTemplate = genericCommandHandler(javaBasePackage, awnsers.commandName);
      fs.writeFileSync(botCommandHandlerRootPath, genericTemplate);
    } else {
      const templatePath = `${botTemplatesRootPath}/${awnsers.commandName.toLowerCase()}.ftl`;
      const symphElementsHandler = customSymphonyElementsHandler(javaBasePackage, awnsers.commandName, awnsers.formId);
      const elementsTemplate = customSymphonyElementsTemplate;
      fs.writeFileSync(botSymphonyElementsCommandHandlerPath, symphElementsHandler);
      fs.writeFileSync(templatePath, elementsTemplate);
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
