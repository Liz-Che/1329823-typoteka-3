'use strict';

const postsRouter = require(`./posts`);
const categoriesRouter = require(`./categories`);
const searchRouter = require(`./search`);

const {HttpCode} = require(`../../constants`);
const {logger} = require(`../logger`);

const express = require(`express`);
const app = express();
app.use(express.json());

app.use((req, res, next) => {
  logger.debug(`Router request ${req.url}`);
  next();
});

app.use(`/api/articles`, postsRouter);
app.use(`/api/categories`, categoriesRouter);
app.use(`/api/search`, searchRouter);
app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).send(`Not found page`);
  logger.error(`End request ${req.url} with error: ${res.statusCode}`);
});

module.exports = app;
