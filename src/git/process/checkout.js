import {local, repoPath} from "../../../utils/constants";

const os = require('os');
const nodegit = require('nodegit');
const branch = 'remotes/origin/develop';

export const checkoutBranch = () => {
  return new Promise((resolve, reject) =>
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
    })
  .then(() => resolve())
  .catch(() => reject(new Error('Error checking out repository'))))
};
