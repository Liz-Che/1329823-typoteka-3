'use strict';

const express = require(`express`);
const {HttpCode} = require(`../constants`);
const path = require(`path`);
const logger = require(`../service/logger`).getLogger();
const {createAPI} = require(`./axios`);
const ApiService = require(`./api-service/service`);
const {getMainRouter, getMyRouter, getPostsRouter, getCategoriesRouter} = require(`./routers`);
const DEFAULT_PORT = 8080;

const service = new ApiService(createAPI());
const app = express();
const STATIC_DIR = path.join(__dirname, `public`);
app.set(`views`, path.join(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.use(express.static(STATIC_DIR));
app.use(express.json());
app.use((req, res, next) => {
  logger.debug(`Router request: ${req.url}`);
  next();
});

app.use(`/`, getMainRouter(service));
app.use(`/my`, getMyRouter(service));
app.use(`/articles`, getPostsRouter(service));
app.use(`/categoties`, getCategoriesRouter(service));

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).send(`Not found page`).render(`errors/400`);
  logger.error(`End request ${req.url} with error: ${res.statusCode}`);
});

app.listen(DEFAULT_PORT, () => {
  logger.info(`Run server on port ${DEFAULT_PORT}`);
}).on(`error`, (err) => {
  logger.error(`Server can't start. Error: ${err}`);
});
