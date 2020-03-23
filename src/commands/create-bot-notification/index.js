import chalk from "chalk";
import {
  getAnwsers,
} from "./questions";
import fs from 'fs';
import ReplaceInFiles from 'replace-in-files';
import TemplatesMap from "./templates";

import { spinnerStart, spinnerError, spinnerStop} from "../../utils/spinner";
import {toKebabCase} from "../../utils/helper";
import {getXml} from "../../utils/files/utils";
import { addNewCommandToHelp } from "../create-command-handler/templates";

export default async (options) => {
  console.log(chalk.bold(
    'This tool will guide you through the process of adding a new notification'
  ));
  const awnsers = await getAnwsers(options);
  spinnerStart('Generating Command Handler');

  const botRoot = options.cwd;
  const pomFilePath = `${botRoot}/pom.xml`;

  try {
    const pomXml = fs.readFileSync(pomFilePath);
    const parsedData = await getXml(pomXml);
    const basePackage = parsedData.project.groupId[0];
    const artifactId = parsedData.project.artifactId[0].toLowerCase();
    const javaBasePackage = `${basePackage}.${artifactId}`;
    const completePackagePath = `${botRoot}/src/main/java/${basePackage.split('.').join('/')}/${artifactId}`;
    const botHelpCommandHandlerPath = `${completePackagePath}/command/HelpCommandHandler.java`;
    const botCommandHandlerRootPath = `${completePackagePath}/command/${awnsers.notificationName}CommandHandler.java`;
    const botTemplatesRootPath = `${botRoot}/src/main/resources/templates`;
    const templatePath = `${botTemplatesRootPath}/${toKebabCase(awnsers.notificationName)}.hbs`;

    const selectedTemplate = TemplatesMap[awnsers.template];
    fs.writeFileSync(templatePath, selectedTemplate.template);
    console.log('');
    console.log(chalk.bold('New template  ') + chalk.green.bold('Installed'));

    if (awnsers.hasHandler) {
      fs.writeFileSync(botCommandHandlerRootPath,
        selectedTemplate.handler(
          javaBasePackage,
          awnsers.notificationName,
          toKebabCase(awnsers.notificationName)
        )
      );
      console.log(chalk.bold('New handler  ') + chalk.green.bold('Installed'));

      const helpCommand = {
        files: [ botHelpCommandHandlerPath ],
        from: new RegExp(/private static final String\[\] DESCRIPTIONS \= \{/),
        to: addNewCommandToHelp(awnsers.notificationName),
      };

      await ReplaceInFiles(helpCommand);
      console.log(chalk.bold('Help command  ') + chalk.green.bold('Updated'));
    }

    if(awnsers.hasHandler) {
      console.log(chalk.green.bold('Please restart the bot to see the changes in effect'));
    }

    spinnerStop(chalk.green.bold('Done'));
  } catch (e) {
    spinnerError('Error: ');
    throw new Error(`please mare sure you're within an bot folder, error: ${e}`);
  }
};
