'use strict';

const postsRouter = require(`./posts`);
const categoriesRouter = require(`./categories`);
const searchRouter = require(`./search`);
const {HttpCode} = require(`../../constants`);
const {Router} = require(`express`);
const initRouter = new Router();

initRouter.use(`/api/articles`, postsRouter);
initRouter.use(`/api/categories`, categoriesRouter);
initRouter.use(`/api/search`, searchRouter);
initRouter.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).send(`Not found page`);
});

module.exports = initRouter;
