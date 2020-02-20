'use strict';

const packageJsonFile = require(`../../../package.json`);
const chalk = require(`chalk`);
const version = packageJsonFile.version;

module.exports = {
  name: `--version`,
  run() {
    console.info(chalk.blue(version));
  }
};
