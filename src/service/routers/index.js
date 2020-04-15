'use strict';

const postsRouter = require(`./posts`);
const categoriesRouter = require(`./categories`);
const searchRouter = require(`./search`);
const {Router} = require(`express`);
const initRouter = new Router();

initRouter.use(`/api/articles`, postsRouter);
initRouter.use(`/api/categories`, categoriesRouter);
initRouter.use(`/api/search`, searchRouter);

module.exports = initRouter;
