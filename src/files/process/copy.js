import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import {repoPath} from "../../../utils/constants";
import {spinnerError, spinnerStart, spinnerStop} from "../../../utils/spinner";
import {copyFiles, deleteFolderRecursive, deleteFileSync} from "../utils";
import { parseString, Builder } from 'xml2js';
import ReplaceInFiles from 'replace-in-files';
import glob from 'glob';
import YAML from 'yamljs';

const access = promisify(fs.access);

const getDirectories = (src, callback) => new Promise((resolve) => glob(`${src}/**/*`,(error, list) => {
  resolve(list);
}));

const basePackage = ['com','symphony','ms','songwriter'];

const processPackageNames = (options, srcFiles, testFiles) => {
  const packageList = options.basePackage.split('.');
  packageList.push(options.projectName.toLowerCase());

  for (let i = packageList.length; i > 0 ; i--) {
    const targetPackages = basePackage.slice(0,i).join('/');
    let newPackages = basePackage.slice(0,i-1);
    newPackages.push(packageList[i-1]);
    newPackages = newPackages.join('/');
    const workPathSrc = `${srcFiles}/${targetPackages}`;
    const newPathSrc = `${srcFiles}/${newPackages}`;
    const workPathTests = `${testFiles}/${targetPackages}`;
    const newPathTests = `${testFiles}/${newPackages}`;
    fs.renameSync(workPathSrc, newPathSrc);
    fs.renameSync(workPathTests, newPathTests);
  }
};

const getXml = async (file) => new Promise((resolve, reject) =>{
  parseString(file, (err, result) => {

    if(err) {
      return reject(err)
    }

    return resolve(result);
  })
});

const writeXml = async (jsonData, xmlPath) => new Promise((resolve) => {
  const builder = new Builder();
  const xml = builder.buildObject(jsonData);
  fs.writeFileSync(xmlPath, xml);
  resolve();
});

export async function createExtensionApp(options) {
  spinnerStart(chalk.bold('Moving bits and bytes'));
  options = {
    ...options,
    targetDirectory: process.cwd(),
  };

  const templateDir = path.resolve(repoPath);
  options.templateDirectory = templateDir;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    spinnerError('%s Invalid boilerplate name', chalk.red.bold('ERROR'));
    process.exit(1);
  }

  await copyFiles(options.templateDirectory, options.targetDirectory);
  deleteFolderRecursive(`${options.targetDirectory}/.git`);
  deleteFileSync(`${options.targetDirectory}/.gitignore`);
  spinnerStop(chalk.bold('Files ') + chalk.green.bold('Installed'));
  return true;
}

export async function createBotApp(options) {
  spinnerStart(chalk.bold('Moving bits and bytes'));
  options = {
    ...options,
    targetDirectory: process.cwd(),
  };

  const templateDir = path.resolve(repoPath);
  options.templateDirectory = templateDir;

  const botJavaFilesPath = `${options.targetDirectory}/src/main/java`;
  const botJavaTestsPath = `${options.targetDirectory}/src/test/java`;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    spinnerError('%s Invalid boilerplate name', chalk.red.bold('ERROR'));
    process.exit(1);
  }

  await copyFiles(options.templateDirectory, options.targetDirectory);

  processPackageNames(options, botJavaFilesPath, botJavaTestsPath);
  const list = await getDirectories(`${options.targetDirectory}/src`);
  const renamePackageOptions = {
    files: list,
    from: /com.symphony.ms.songwriter/g,
    to: `${options.basePackage}.${options.projectName.toLowerCase()}`,
  };

  await ReplaceInFiles(renamePackageOptions);

  const pomFilePath = `${options.targetDirectory}/pom.xml`;
  const botConfigPath = `${options.targetDirectory}/src/main/resources/bot-config.json`;
  const applicationYamlPath = `${options.targetDirectory}/src/main/resources/application-dev.yaml`;

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
    configBot.botPrivateKeyName = `${options.projectName}_privatekey.pkcs8`;
    configBot.appPrivateKeyName = `${options.projectName}_privatekey.pkcs8`;
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
