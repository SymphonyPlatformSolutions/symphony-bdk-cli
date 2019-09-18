'use strict';

var nodegit = require("nodegit"),
Clone = nodegit.Clone,
cred = nodegit.Cred;

var options = {
  remoteCallbacks: {
    credentials: function () {
      return cred.sshKeyNew('gluizbr', './Git/cli/id_rsa.pub', './Git/cli/id_rsa.pem', '');
    }
  }
};

export const getTemplateProject = () => {
  // Clone a given repository into the `./tmp` folder.
  console.log('time to clone');
  Clone.clone("https://github.com/SymphonyPlatformSolutions/sms-dev-fe-template-app.git", "./Git/cli/tmp", options)
    .then(function(repo) {
        console.log(repo);
      },
      function(err){
        console.log(err);
      }
    );
};

//"https://5230c7e25166988b6439129b0eeabcf629a70568@github.com/SymphonyPlatformSolutions/sms-dev-fe-template-app.git"
