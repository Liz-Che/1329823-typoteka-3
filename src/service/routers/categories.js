'use strict';

const {Router} = require(`express`);
const categoriesRouter = new Router();
const logger = require(`../logger`).getLogger();
const {HttpCode} = require(`../../constants`);

const getCategoryRouter = (categoryService) => {
  categoriesRouter.get(`/`, (req, res) => {
    const categories = categoryService.findAll();
    res.status(HttpCode.OK).json(categories);
    logger.info(`Status code ${res.statusCode}`);
    return;
  });
  return categoriesRouter;
};

module.exports = {getCategoryRouter};
