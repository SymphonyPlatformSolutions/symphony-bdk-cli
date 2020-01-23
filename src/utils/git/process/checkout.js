import {repoPath} from "../../constants";
import {spinnerError, spinnerStart, spinnerStop} from "../../spinner";
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
    throw new Error(e);
  }

  spinnerStop(chalk.green.bold('Checked'));
};
