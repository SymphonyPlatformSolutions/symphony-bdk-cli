import {getAnwsers} from "../questions/generate-keys";
import { deleteFileSync, readFileSync } from "../files/utils";

const execSync = require('child_process').execSync;

import chalk from "chalk";
import fs from 'fs';
import nJwt from 'njwt';
import path from 'path';
import {spinnerStart, spinnerStop} from "../../utils/spinner";

export const generateBotKeys = (projectRoot, botEmailAddress, botId) => {
  spinnerStart('Generating bot development keys\n');
  const certArgs = `/emailAddress=${botEmailAddress}`;
  const targetFolder = `${projectRoot}/certs`;
  fs.existsSync(targetFolder) || fs.mkdirSync(targetFolder);
  process.chdir(targetFolder);
  execSync(`openssl genrsa -out ${botId}_privatekey.pem 4096`);
  execSync(`openssl req -newkey rsa:4096 -x509 -key ${botId}_privatekey.pem -out ${botId}_public.cer -subj ${certArgs}`);
  execSync(`openssl pkcs8 -topk8 -nocrypt -in ${botId}_privatekey.pem -out ${botId}_privatekey.pkcs8`);
  execSync(`openssl x509 -pubkey -noout -in ${botId}_public.cer > ${botId}_public.pem`);
  let contents = fs.readFileSync(path.resolve(targetFolder,`${botId}_privatekey.pkcs8`), 'utf8');
  deleteFileSync(`${targetFolder}/${botId}_public.cer`);
  deleteFileSync(`${targetFolder}/${botId}_privatekey.pem`);
  const publicCert = readFileSync(`${targetFolder}/${botId}_public.pem`);
  spinnerStop(chalk.bold('Keys generated.'));
  process.chdir(projectRoot);
  return publicCert;
};

const generateCustomKeys = async (options) => {
  const awnsers = await getAnwsers(options);
  const {
    botId,
    botEmailAddress,
  } = awnsers;

  const claims = {
    'sub': botId,
  };

  const certArgs = `/emailAddress=${botEmailAddress}`;
  const targetFolder = `${options.cwd}/certs`;
  fs.existsSync(targetFolder) || fs.mkdirSync(targetFolder);
  process.chdir(targetFolder);
  execSync(`openssl genrsa -out private-${botId}.pem 4096`);
  execSync(`openssl req -newkey rsa:4096 -x509 -key private-${botId}.pem -out public-${botId}.cer -subj ${certArgs}`);
  execSync(`openssl pkcs8 -topk8 -nocrypt -in private-${botId}.pem -out private-${botId}.pkcs8`);
  execSync(`openssl x509 -pubkey -noout -in public-${botId}.cer > public-${botId}.pem`);
  let contents = fs.readFileSync(path.resolve(targetFolder,`private-${botId}.pkcs8`), 'utf8');
  deleteFileSync(`${targetFolder}/public-${botId}.cer`);
  deleteFileSync(`${targetFolder}/private-${botId}.pem`);
  const publicCert = readFileSync(`${targetFolder}/public-${botId}.pem`);
  var jwt = nJwt.create(claims, contents, 'RS512');
  jwt.setExpiration(new Date().getTime() + (3 * 60 * 1000));
  console.log(publicCert);
  var token = jwt.compact();
  console.log(chalk.bold('JWT Token: '));
  console.log(token)
};

export default generateCustomKeys;
