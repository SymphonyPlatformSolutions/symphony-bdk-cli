'use strict';

const os = require('os');
var nodegit = require('nodegit'),
  path = require('path');

var url = "git@github.com:SymphonyPlatformSolutions/sms-dev-fe-template-app.git",
  local = ".tmp",
  userName = "git";

var pubPath = path.join(os.homedir(), 'Git/cli/sms-sdk-cli/src/git/cert/', 'id_rsa.pub');
var privPath = path.join(os.homedir(), 'Git/cli/sms-sdk-cli/src/git/cert/', 'id_rsa');

var cred = nodegit.Cred.sshKeyNew(
  userName,
  pubPath,
  privPath,
  'Symphony!123456');

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
  return await nodegit.Clone(url, local, cloneOpts).then(function (repo) {
    console.log("Cloned " + path.basename(url) + " to " + repo.workdir());
  }).catch(function (err) {
    console.log(err);
  });
};
