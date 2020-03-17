'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {HttpCode, MOCK_FILE_NAME} = require(`../../constants`);
const {Router} = require(`express`);
const postsRouter = new Router();

postsRouter.get(`/`, async (req,res) => {
  try {
    const content = await fs.readFile(MOCK_FILE_NAME);
    res.json(JSON.parse(content));
  } catch (err) {
    if (err.code === `ENOENT`) {
      res.status(HttpCode.NOT_FOUND).send([]);
      console.log(chalk.red(`Not found file ${MOCK_FILE_NAME}`));
      return;
    }
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(`Server error`);
    console.log(chalk.red(err));
  }
});

module.exports = postsRouter;
