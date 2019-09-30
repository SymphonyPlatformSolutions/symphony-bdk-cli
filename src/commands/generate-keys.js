import {getAnwsers} from "../questions/generate-keys";

const execSync = require('child_process').execSync;

import chalk from "chalk";
import fs from 'fs';
import nJwt from 'njwt';
import path from 'path';

const generateKeys = async (options) => {
  const awnsers = await getAnwsers(options);
  const {
    botId,
    privateKeyName,
    publicKeyName,
    countryCode,
    stateProvince,
    locality,
    organizationName,
    organizationUnit,
    commonName,
  } = awnsers;

  const claims = {
    'sub': botId,
  };

  const certArgs = `/C=${countryCode}/ST=${stateProvince}/L=${locality}/O=${organizationName}/OU=${organizationUnit}/CN=${commonName}`;

  const targetFolder = `${options.cwd}/cert`;
  fs.existsSync(targetFolder) || fs.mkdirSync(targetFolder);
  process.chdir(targetFolder);
  execSync(`openssl genrsa -out ${privateKeyName}.pem 4096`);
  execSync(`openssl req -newkey rsa:4096 -x509 -key ${privateKeyName}.pem -out ${publicKeyName}.cer -subj ${certArgs}`);
  execSync(`openssl pkcs8 -topk8 -nocrypt -in ${privateKeyName}.pem -out ${privateKeyName}.pkcs8`);
  execSync(`openssl x509 -pubkey -noout -in ${publicKeyName}.cer > ${publicKeyName}.pem`);
  let contents = fs.readFileSync(path.resolve(targetFolder,`${privateKeyName}.pkcs8`), 'utf8');
  var jwt = nJwt.create(claims, contents, 'RS512');
  jwt.setExpiration(new Date().getTime() + (3 * 60 * 1000));
  var token = jwt.compact();
  console.log(chalk.bold('Token: '));
  console.log('');
  console.log('');
  console.log('');
  console.log(token)
};

export default generateKeys;
