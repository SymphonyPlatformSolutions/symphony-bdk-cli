import chalk from "chalk";
import {spinnerStart, spinnerStop} from "../../utils/spinner";
import {promisify} from "util";
import ncp from 'ncp';
import { parseString, Builder } from 'xml2js';

var fs = require('fs');
const copy = promisify(ncp);

export async function copyFiles(origin, destiny) {
  return copy(origin, destiny, {
    clobber: false,
  });
}

export const readFileToJsonObject = (path) => {
  let rawdata = fs.readFileSync(path);
  return JSON.parse(rawdata);
};

export var deleteFolderRecursive = function(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file, index){
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

export var deleteFileSync = function(filePath) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

export var readFileSync = function (filePath) {
  return fs.readFileSync(filePath,'utf-8');
};

export var deleteFolder = (path) => {
  spinnerStart(chalk.bold('Checking local requirements'));
  deleteFolderRecursive(path);
  spinnerStop(chalk.bold('Filesystem ') + chalk.green.bold('cleaned'));
}

export const getXml = async (file) => new Promise((resolve, reject) =>{
  parseString(file, (err, result) => {

    if(err) {
      return reject(err)
    }

    return resolve(result);
  })
});

export const writeXml = async (jsonData, xmlPath) => new Promise((resolve) => {
  const builder = new Builder();
  const xml = builder.buildObject(jsonData);
  fs.writeFileSync(xmlPath, xml);
  resolve();
});
