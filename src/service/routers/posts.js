'use strict';

const fs = require(`fs`).promises;
const {HttpCode, MOCK_FILE_NAME} = require(`../../constants`);
const {Router} = require(`express`);
const postsRouter = new Router();
const logger = require(`../logger`).getLogger();

const getPost = async () => JSON.parse((await fs.readFile(MOCK_FILE_NAME)).toString());

postsRouter.get(`/`, async (req, res) => {
  try {
    res.json(await getPost());
    logger.info(`Status code ${res.statusCode}`);
    return;
  } catch (err) {
    if (err.code === `ENOENT`) {
      res.status(HttpCode.NOT_FOUND).send([]);
      logger.info(`Status code ${res.statusCode}`);
      return;
    }
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(`Server error`);
    logger.info(`Status code ${res.statusCode}`);
    return;
  }
});

postsRouter.get(`/:articleId`, async (req, res) => {
  const post = (await getPost()).find((it) => it.id === req.params.articleId);
  if (!post) {
    res.status(HttpCode.BED_REQUEST).send(`BED_REQUEST`);
    logger.info(`Status code ${res.statusCode}`);
    return;
  }
  res.json(post);
  logger.info(`Status code ${res.statusCode}`);
  return;
});

postsRouter.post(`/`, async (req, res) => {
  const keyPost = [
    `id`,
    `title`,
    `announce`,
    `fullText`,
    `createdDate`,
    `category`,
    `comments`
  ];
  for (const key of keyPost) {
    if (!req.body [key]) {
      res.status(HttpCode.BED_REQUEST).send(`BED_REQUEST`);
      logger.info(`Status code ${res.statusCode}`);
      return;
    }
  }
  res.json({response: `New post created!`, data: req.body});
  logger.info(`Status code ${res.statusCode}`);
  return;
});

postsRouter.delete(`/:articleId`, async (req, res) => {
  const post = (await getPost()).find((el) => el.id === req.params.articleId);
  if (!post) {
    res.status(HttpCode.NO_CONTENT).send(`NO_CONTENT`);
    logger.info(`Status code ${res.statusCode}`);
    return;
  }
  res.json({response: `Delete post by id: ${post.id}`});
  logger.info(`Status code ${res.statusCode}`);
  return;
});

postsRouter.get(`/:articleId/comments`, async (req, res) => {
  const post = (await getPost()).find((el) => el.id === req.params.articleId);
  if (!post) {
    res.status(HttpCode.BED_REQUEST).send(`BED_REQUEST`);
    logger.info(`Status code ${res.statusCode}`);
    return;
  }
  res.json(post.comments);
  logger.info(`Status code ${res.statusCode}`);
  return;
});

postsRouter.delete(`/:articleId/comments/:commentId`, async (req, res) => {
  const {articleId, commentId} = req.params;
  const post = (await getPost()).find((el) => el.id === articleId);
  if (!post) {
    res.status(HttpCode.BED_REQUEST).send(`BED_REQUEST`);
    logger.info(`Status code ${res.statusCode}`);
    return;
  }
  const comment = post.comments.find((el) => el.id === commentId);
  if (!comment) {
    res.status(HttpCode.BED_REQUEST).send(`BED_REQUEST`);
    logger.info(`Status code ${res.statusCode}`);
    return;
  }
  res.json({response: `Delete comment ${comment.id}!`});
  logger.info(`Status code ${res.statusCode}`);
  return;
});

postsRouter.put(`/:articleId/comments`, async (req, res) => {
  const post = (await getPost()).find((el) => el.id === req.params.articleId);
  if (!post) {
    res.sendStatus(HttpCode.BED_REQUEST);
    logger.info(`Status code ${res.statusCode}`);
    return;
  }
  const {id, text} = req.body;
  if (!id || !text) {
    res.status(HttpCode.BED_REQUEST).send(`BED_REQUEST`);
    logger.info(`Status code ${res.statusCode}`);
    return;
  }
  res.json({response: `Create new comment!`, data: req.body});
  logger.info(`Status code ${res.statusCode}`);
  return;
});

module.exports = postsRouter;
