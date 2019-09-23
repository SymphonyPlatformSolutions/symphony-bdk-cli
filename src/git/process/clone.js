'use strict';
import chalk from "chalk";
import {local} from "../../../utils/constants";
import {spinnerError, spinnerStart, spinnerStop} from "../../../utils/spinner";

const os = require('os');
var nodegit = require('nodegit'),
  path = require('path');

const url = "git@github.com:SymphonyPlatformSolutions/sms-dev-fe-template-app.git",
  userName = "git",
  certPath = `${os.homedir()}/.ssh/`;

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

export async function getTemplateProject() {
  // Clone a given repository into the `./tmp` folder.
  spinnerStart(chalk.bold('Getting template app'));
  return await nodegit.Clone(url, local, cloneOpts).then(function (repo) {
    spinnerStop(chalk.bold('Template ') + chalk.green.bold("CLONED"));
  }).catch(function (err) {
    spinnerError(err);
  });
}
