import chalk from "chalk";
import {spinnerStart, spinnerStop} from "../../utils/spinner";

var fs = require('fs');

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

export var deleteFolder = (path) => {
  spinnerStart(chalk.bold('Deleting temp folders'));
  deleteFolderRecursive(path);
  spinnerStop(chalk.bold('Folder ') + chalk.green.bold('DELETED'));
}
