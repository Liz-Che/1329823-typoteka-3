'use strict';

const fs = require(`fs`).promises;
const FILE_CATEGORIES_PATH = `data/categories.txt`;
const {Router} = require(`express`);
const categoriesRouter = new Router();

const readMocks = async (path) => (await fs.readFile(path)).toString().trim().split(`\n`);

categoriesRouter.get(`/`, async (req, res) => {
  res.json(await readMocks(FILE_CATEGORIES_PATH));
});

module.exports = categoriesRouter;
