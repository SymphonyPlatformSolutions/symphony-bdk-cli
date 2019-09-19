'use strict';
var nodegit = require('nodegit'),
  path = require('path');

var url = "https://github.com/SymphonyPlatformSolutions/sms-dev-fe-template-app.git",
  local = "~/Git/cli/sms-sdk-cli/src/tmp",
  usernName = "gluizbr";

var cloneOpts = {
  fetchOpts: {
    callbacks: {
      credentials: function (url, userName) {
        return nodegit.Cred.sshKeyNew(
          userName,
          '~/Git/cli/sms-sdk-cli/src/git/id_rsa.pub',
          '~/Git/cli/sms-sdk-cli/src/git/id_rsa',
          'Symphony!123456');
      }
    }
  }
};

export const getTemplateProject = () => {
  // Clone a given repository into the `./tmp` folder.
  console.log('time to clone');
  nodegit.Clone(url, local, cloneOpts).then(function (repo) {
    console.log("Cloned " + path.basename(url) + " to " + repo.workdir());
  }).catch(function (err) {
    console.log(err);
  });
};

//"https://5230c7e25166988b6439129b0eeabcf629a70568@github.com/SymphonyPlatformSolutions/sms-dev-fe-template-app.git"
