import {getAnwsers} from "../questions/generate-keys";
import { deleteFileSync, readFileSync } from "../files/utils";

const execSync = require('child_process').execSync;

import chalk from "chalk";
import fs from 'fs';
import nJwt from 'njwt';
import path from 'path';
import {spinnerStart, spinnerStop} from "../../utils/spinner";

export const generateBotKeys = (projectRoot, botEmailAddress, projectName) => {
  spinnerStart('Generating bot RSA keys\n');
  const certArgs = `/emailAddress=${botEmailAddress}`;
  const targetFolder = `${projectRoot}/certs`;
  fs.existsSync(targetFolder) || fs.mkdirSync(targetFolder);
  process.chdir(targetFolder);
  execSync(`openssl genrsa -out ${projectName}_privatekey.pem 4096`);
  execSync(`openssl req -newkey rsa:4096 -x509 -key ${projectName}_privatekey.pem -out ${projectName}_public.cer -subj ${certArgs}`);
  execSync(`openssl pkcs8 -topk8 -nocrypt -in ${projectName}_privatekey.pem -out ${projectName}_privatekey.pkcs8`);
  execSync(`openssl x509 -pubkey -noout -in ${projectName}_public.cer > ${projectName}_public.pem`);
  let contents = fs.readFileSync(path.resolve(targetFolder,`${projectName}_privatekey.pkcs8`), 'utf8');
  deleteFileSync(`${targetFolder}/${projectName}_public.cer`);
  deleteFileSync(`${targetFolder}/${projectName}_privatekey.pem`);
  const publicCert = readFileSync(`${targetFolder}/${projectName}_public.pem`);
  spinnerStop(chalk.bold('Keys generated.'));
  process.chdir(projectRoot);
  return publicCert;
};

const generateCustomKeys = async (options) => {
  const awnsers = await getAnwsers(options);
  const {
    projectName,
    botEmailAddress,
  } = awnsers;

  const claims = {
    'sub': projectName,
  };

  const certArgs = `/emailAddress=${botEmailAddress}`;
  const targetFolder = `${options.cwd}/certs`;
  fs.existsSync(targetFolder) || fs.mkdirSync(targetFolder);
  process.chdir(targetFolder);
  execSync(`openssl genrsa -out private-${projectName}.pem 4096`);
  execSync(`openssl req -newkey rsa:4096 -x509 -key private-${projectName}.pem -out public-${projectName}.cer -subj ${certArgs}`);
  execSync(`openssl pkcs8 -topk8 -nocrypt -in private-${projectName}.pem -out private-${projectName}.pkcs8`);
  execSync(`openssl x509 -pubkey -noout -in public-${projectName}.cer > public-${projectName}.pem`);
  let contents = fs.readFileSync(path.resolve(targetFolder,`private-${projectName}.pkcs8`), 'utf8');
  deleteFileSync(`${targetFolder}/public-${projectName}.cer`);
  deleteFileSync(`${targetFolder}/private-${projectName}.pem`);
  const publicCert = readFileSync(`${targetFolder}/public-${projectName}.pem`);
  var jwt = nJwt.create(claims, contents, 'RS512');
  jwt.setExpiration(new Date().getTime() + (3 * 60 * 1000));
  console.log(publicCert);
  var token = jwt.compact();
  console.log(chalk.bold('JWT Token: '));
  console.log(token)
};

export default generateCustomKeys;
