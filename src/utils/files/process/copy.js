import chalk from 'chalk';
import fs from 'fs';
import fsExtra from 'fs-extra';
import { promisify } from 'util';
import { spinnerStart, spinnerStop } from "../../spinner";
import {deleteFolderRecursive, deleteFileSync, getXml, writeXml} from "../utils";
import ReplaceInFiles from 'replace-in-files';
import glob from 'glob';
import YAML from 'yamljs';

const getDirectories = (src, callback) => new Promise((resolve) => glob(`${src}/**/*`,(error, list) => {
  resolve(list);
}));

const basePackage = ['com','symphony','bdk','bot', 'template'];

const tmpSrcFolder = './.tmpMoveSrc';
const tmpTestSrcFolder = './.tmpTestMoveSrc';

const processPackageNames = (options, srcFiles, testFiles) => {
  const packageList = options.basePackage.split('.').filter(elem => elem.length);
  packageList.push(options.projectName.toLowerCase());
  const srcCodeBasePath = `${srcFiles}/${basePackage.join('/')}`;
  const testSrcDodeBasePath = `${testFiles}/${basePackage.join('/')}`;
  fsExtra.copySync(srcCodeBasePath, tmpSrcFolder);
  fsExtra.copySync(testSrcDodeBasePath, tmpTestSrcFolder);
  fsExtra.removeSync(`${srcFiles}/com`);
  fsExtra.removeSync(`${testFiles}/com`);
  fsExtra.copySync(tmpSrcFolder, `${srcFiles}/${packageList.join('/')}`);
  fsExtra.copySync(tmpTestSrcFolder, `${testFiles}/${packageList.join('/')}`);
  fsExtra.removeSync(tmpSrcFolder);
  fsExtra.removeSync(tmpTestSrcFolder);
};

export async function createBotApp(options) {
  spinnerStart(chalk.bold('Moving bits and bytes'));
  options = {
    ...options,
    targetDirectory: process.cwd(),
  };

  const botJavaFilesPath = `${options.targetDirectory}/src/main/java`;
  const botJavaTestsPath = `${options.targetDirectory}/src/test/java`;

  processPackageNames(options, botJavaFilesPath, botJavaTestsPath);
  const list = await getDirectories(`${options.targetDirectory}/src`);
  const renamePackageOptions = {
    files: list,
    from: /com.symphony.bdk.bot.template/g,
    to: `${options.basePackage}.${options.projectName.toLowerCase()}`,
  };

  await ReplaceInFiles(renamePackageOptions);

  const pomFilePath = `${options.targetDirectory}/pom.xml`;
  const botConfigPath = `${options.targetDirectory}/src/main/resources/bot-config.json`;
  const applicationYamlPath = `${options.targetDirectory}/src/main/resources/application.yaml`;

  try {
    const pomXml = fs.readFileSync(pomFilePath);
    const parsedData = await getXml(pomXml);
    parsedData.project.groupId[0] = options.basePackage;
    parsedData.project.artifactId[0] = options.projectName;
    await writeXml(parsedData, pomFilePath);
  }catch (e) {
    throw new Error(`Error while processing ${pomFilePath}, with the following error: ${e}`);
  }

  try {
    const configBotBits = fs.readFileSync(botConfigPath);
    const configBot = JSON.parse(configBotBits);
    configBot.botUsername = options.botUsername;
    configBot.botPrivateKeyName = `${options.projectName.toLowerCase()}_privatekey.pkcs8`;
    configBot.appPrivateKeyName = `${options.projectName.toLowerCase()}_privatekey.pkcs8`;
    configBot.appId = options.applicationId;
    configBot.botEmailAddress = options.botServiceEmail;
    configBot.sessionAuthHost = options.podAddress;
    configBot.keyAuthHost = options.podAddress;
    configBot.podHost = options.podAddress;
    configBot.agentHost = options.podAddress;

    const mangledConfig = JSON.stringify(configBot, null, 2);
    fs.writeFileSync(botConfigPath, mangledConfig);
  }catch (e) {
    throw new Error(`Error while processing ${botConfigPath}, with the following error: ${e}`);
  }

  try {
    const appYaml = YAML.load(applicationYamlPath);
    appYaml.server.servlet['display-name'] = options.projectName.toLowerCase();
    appYaml.server.servlet['context-path'] = `/${options.projectName.toLowerCase()}`;
    appYaml.logging.file = `\$\{resources\}/logs/${options.projectName.toLowerCase()}.log`;
    const yamlString = YAML.stringify(appYaml,5);
    fs.writeFileSync(applicationYamlPath, yamlString, 'utf-8');
  }catch (e) {
    throw new Error(`Error while processing ${applicationYamlPath}, with the following error: ${e}`);
  }

  deleteFolderRecursive(`${options.targetDirectory}/.git`);
  deleteFolderRecursive(`${options.targetDirectory}/.tmp`);
  deleteFileSync(`${options.targetDirectory}/.gitignore`);
  spinnerStop(chalk.bold('Boilerplate ') + chalk.green.bold('Installed'));
  return true;
}
