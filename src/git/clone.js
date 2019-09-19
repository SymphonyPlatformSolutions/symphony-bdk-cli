'use strict';
const os = require('os');
var nodegit = require('nodegit'),
  path = require('path');

var url = "git@github.com:SymphonyPlatformSolutions/sms-sdk-cli.git",
  local = "src/tmp",
  userName = "git";

var pubPath = path.join(os.homedir(), 'Git/cli/sms-sdk-cli/src/git/', 'id_rsa.pub');
var privPath = path.join(os.homedir(), 'Git/cli/sms-sdk-cli/src/git/', 'id_rsa');

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

export const getTemplateProject = () => {
  console.log(pubPath, privPath);
  // Clone a given repository into the `./tmp` folder.
  console.log('time to clone', cloneOpts.fetchOpts.callbacks.credentials());
  nodegit.Clone(url, local, cloneOpts).then(function (repo) {
    console.log("Cloned " + path.basename(url) + " to " + repo.workdir());
  }).catch(function (err) {
    console.log(err);
  });
};
