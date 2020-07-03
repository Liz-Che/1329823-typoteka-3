'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {MOCK_FILE_NAME, ExitCode} = require(`../../constants`);

const readContentJSON = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    if (!content.trim().length) {
      return [];
    }
    return JSON.parse(content);
  } catch (err) {
    return [];
  }
};

const getMockData = async () => {
  let fileData = null;
  try {
    fileData = await readContentJSON(MOCK_FILE_NAME);
  } catch (err) {
    console.log(chalk.red(err));
    process.exit(ExitCode.error);
  }
  return fileData;
};

module.exports = {getMockData};
