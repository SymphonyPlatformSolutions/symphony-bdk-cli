'use strict';
import chalk from "chalk";
import {local} from "../../constants";
import {spinnerError, spinnerStart, spinnerStop} from "../../spinner";

const os = require('os');
const nodegit = require('nodegit');
const path = require('path');

const userName = "git";
const certPath = `${os.homedir()}/.ssh/`;

var pubPath = path.join(certPath, 'id_rsa.pub');
var privPath = path.join(certPath, 'id_rsa');

var cred = nodegit.Cred.sshKeyNew(
  userName,
  pubPath,
  privPath,
  '');

var cloneOpts = {
  fetchOpts: {
    callbacks: {
      credentials: function () {
        return cred;
      }
    }
  }
};

export async function getTemplateProject(repoUrl) {
  spinnerStart(chalk.bold('Getting latest boilerplate application'));
  return await nodegit.Clone(repoUrl, local, cloneOpts).then(function (repo) {
    spinnerStop(chalk.bold('Boilerplate ') + chalk.green.bold("accessed"));
  }).catch(function (err) {
    console.log(err);
    spinnerError(err);
  });
}
