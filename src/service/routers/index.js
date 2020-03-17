'use strict';

const postsRouter = require(`./posts`);
const {Router} = require(`express`);
const initRouter = new Router();

initRouter.use(`/posts`, postsRouter);

module.exports = initRouter;
