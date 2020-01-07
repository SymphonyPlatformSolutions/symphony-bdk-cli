import chalk from "chalk";

const ora = require('ora');
var spinner;

export const spinnerStart = (text) => {
   spinner = new ora({
    text: text,
  });

  spinner.start();

  setTimeout(() => {
    spinner.color = 'green';
  });
};

export const spinnerStop = (text) => {
  spinner.succeed(text);
};

export const spinnerError = (text) => {
  spinner.fail(text);
};
