import {repoPath} from "../../../utils/constants";
import {spinnerError, spinnerStart, spinnerStop} from "../../../utils/spinner";
import chalk from "chalk";

const nodegit = require('nodegit');

export const checkoutBranch = async (branch) => {
  spinnerStart('Accessing required dependencies');

  try {

    const repo = await nodegit.Repository.open(repoPath);
    const targetBranchRef = await repo.getBranch(branch);
    await repo.checkoutRef(targetBranchRef);

  }catch (e) {
    spinnerError('Error while getting access to the required dependencies');
    reject(new Error('Error while getting access to the required dependencies'));
  }

  spinnerStop(chalk.green.bold('Checked'));
};
