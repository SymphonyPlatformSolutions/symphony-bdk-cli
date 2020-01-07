import chalk from "chalk";
const commandExistsSync = require('command-exists').sync;
import { spinnerStart, spinnerError, spinnerStop} from "../../utils/spinner";

export default async () => {

  const checks = [];
  const errorMessages = [];
  spinnerStart('Checking required dependencies');
  let haveDependencies = true;

  checks.push({
    dependency: () => commandExistsSync('openssl'),
    errorMessage: 'OpenSsl needs to be installed, in its latest version go to the OpenSSL website:',
    downloadLink: '(https://www.openssl.org/source)',
  });

  checks.push({
    dependency: () => commandExistsSync('node'),
    errorMessage: 'NodeJS needs to be installed, in its latest version go to the NodeJs website:',
    downloadLink: '(https://nodejs.org/en/)',
  });

  checks.push({
    dependency: () => commandExistsSync('yarn'),
    errorMessage: 'Yarn needs to be installed, in its latest version, please run:',
    downloadLink: '$ npm install -g yarn',
  });

  checks.push({
    dependency: () => commandExistsSync('java'),
    errorMessage: 'JDK needs to be installed version 8 or later. vist the Java website:',
    downloadLink: '(https://www.oracle.com/technetwork/pt/java/javase/downloads/index.html)',
  });

  checks.push({
    dependency: () => commandExistsSync('mvn'),
    errorMessage: 'Maven needs to be installed version 3 or later. vist the Maven website:',
    downloadLink: '(https://maven.apache.org/)',
  });

  checks.forEach(check => {
    if (!check.dependency()) {
      errorMessages.push(chalk.hex('#ff0000').bold(check.errorMessage), chalk.hex('#00BFFF').underline(check.downloadLink));
      haveDependencies = false;
    }
  });

  if(!haveDependencies) {
    spinnerError('Dependencies check failed, please install the mentioned dependencies');
    errorMessages.forEach(error => {
      console.log(error);
    })
  } else {
    spinnerStop('All Dependencies are met!');
  }
  return haveDependencies;
}
