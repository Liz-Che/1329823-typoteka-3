'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {HttpCode, MOCK_FILE_NAME} = require(`../../constants`);
const {Router} = require(`express`);
const postsRouter = new Router();

const getPost = async () => JSON.parse((await fs.readFile(MOCK_FILE_NAME)).toString());

postsRouter.get(`/`, async (req, res) => {
  try {
    res.json(await getPost);
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

postsRouter.get(`/:articleId`, async (req, res) => {
  const post = (await getPost()).find((it) => it.id === req.params.articleId);
  if (!post) {
    res.status(HttpCode.BED_REQUEST).send(`BED_REQUEST`);
    console.log(chalk.red(`bed request`));
    return;
  }
  res.json(post);
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
    }
  }
  res.json({response: `New post created!`, data: req.body});
});

postsRouter.delete(`/:articles/:articleId`, async (req, res) => {
  const post = (await getPost()).find((el) => el.id === req.params.articleId);
  if (!post) {
    res.status(HttpCode.NO_CONTENT).send(`NO_CONTENT`);
    console.log(chalk.red(`Creative not found or has been removed before`));
  }
  res.json({response: `Delete post by id: ${post.id}`});
});

postsRouter.get(`/:articleId/comments`, async (req, res) => {
  const post = (await getPost()).find((el) => el.id === req.params.articleId);
  if (!post) {
    res.status(HttpCode.BED_REQUEST).send(`BED_REQUEST`);
  }
  res.json(post.comments);
});

postsRouter.delete(`/:articleId/comments/:commentId`, async (req, res) => {
  const {articleId, commentId} = req.params;
  const post = (await getPost()).find((el) => el.id === articleId);
  const comment = post.comments.find((el) => el.id === commentId);
  if ((!post) || (!comment)) {
    res.status(HttpCode.BED_REQUEST).send(`BED_REQUEST`);
    console.log(chalk.red(`Bed request`));
  }
  res.json({response: `Delete comment ${comment.id}!`});
});

postsRouter.put(`/:articleId/comments`, async (req, res) => {
  const {id, text} = req.body;
  if (!id || !text) {
    res.status(HttpCode.BED_REQUEST).send(`BED_REQUEST`);
    console.log(chalk.red(`Bed request`));
  }
  res.json({response: `Create new comment!`, data: req.body});
});

module.exports = postsRouter;
