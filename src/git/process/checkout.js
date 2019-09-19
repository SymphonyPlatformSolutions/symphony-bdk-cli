const os = require('os');

var nodegit = require('nodegit'),
  path = require('path');

var repoPath = path.join(os.homedir(), 'Git/cli/sms-sdk-cli/.tmp/');
var branch = 'remotes/origin/develop';

export const checkoutBranch = () => {
  nodegit.Repository.open(repoPath).then(function(repo) {
    return repo.getCurrentBranch().then(function(ref) {
      console.log("On " + ref.shorthand() + " " + ref.target());

      console.log("Checking out develop");
      var checkoutOpts = {
        checkoutStrategy: nodegit.Checkout.STRATEGY.FORCE
      };
      return repo.checkoutBranch(branch, checkoutOpts);
    }).then(function () {
      return repo.getCurrentBranch().then(function(ref) {
        console.log("On " + ref.shorthand() + " " + ref.target());
      });
    });
  }).catch(function (err) {
    console.log(err);
  }).done(function () {
    console.log('Finished');
  });
}
