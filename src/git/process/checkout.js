import {repoPath} from "../../../utils/constants";
import {spinnerError, spinnerStart, spinnerStop} from "../../../utils/spinner";
import chalk from "chalk";

const os = require('os');
const nodegit = require('nodegit');
const branch = 'remotes/origin/develop';

export const checkoutBranch = () => {
  spinnerStart('Checking out repository');
  return new Promise((resolve, reject) =>
    nodegit.Repository.open(repoPath).then(function(repo) {
      return repo.getCurrentBranch().then(function(ref) {
        var checkoutOpts = {
          checkoutStrategy: nodegit.Checkout.STRATEGY.FORCE
        };
        return repo.checkoutBranch(branch, checkoutOpts);
      }).then(function () {
        return repo.getCurrentBranch().then(function(ref) {
        });
      });
    })
  .then(() => {
    spinnerStop(chalk.green.bold('Checked'));
    return resolve();
  })
  .catch(() => {
    spinnerError('Error checking out repository');
    reject(new Error('Error checking out repository'));
  }))
};
