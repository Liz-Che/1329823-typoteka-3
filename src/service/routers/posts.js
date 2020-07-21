'use strict';

const {HttpCode} = require(`../../constants`);
const {formatArticleDate} = require(`../cli/utils`);
const postValidator = require(`../middlewares/post-validator`);
const commentValidator = require(`../middlewares/comment-validator`);
const {Router} = require(`express`);

const postsRouter = new Router();

const getPostRouter = (postService, commentService) => {

  postsRouter.get(`/`, (req, res) => {
    const posts = postService.findAll();
    return res.status(HttpCode.OK).json(formatArticleDate(posts));
  });

  postsRouter.get(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const post = postService.findOne(articleId);
    if (!post) {
      return res.status(HttpCode.NOT_FOUND)
        .json({
          error: true,
          status: HttpCode.NOT_FOUND,
          message: `Post with id: ${articleId} is not found`
        });
    }
    return res.status(HttpCode.OK).json(formatArticleDate(post));
  });

  postsRouter.post(`/`, postValidator, (req, res) => {
    const post = postService.create(req.body);
    return res.status(HttpCode.CREATED).json(formatArticleDate(post));
  });

  postsRouter.put(`/:articleId`, postValidator, (req, res) => {
    const {articleId} = req.params;
    const article = postService.findOne(articleId);
    if (!article) {
      return res.status(HttpCode.NOT_FOUND)
      .json({
        error: true,
        status: HttpCode.NOT_FOUND,
        message: `Post with id: ${articleId} not found`
      });
    }
    const updatedArticle = postService.update(articleId, req.body);
    return res.status(HttpCode.OK).json(formatArticleDate(updatedArticle));
  });

  postsRouter.delete(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const post = postService.drop(articleId);
    if (!post) {
      return res.status(HttpCode.NOT_FOUND)
        .json({
          error: true,
          status: HttpCode.NOT_FOUND,
          message: `Post with id: ${articleId} is not found`
        });
    }
    return res.status(HttpCode.OK).json(formatArticleDate(post));
  });

  postsRouter.get(`/:articleId/comments`, commentValidator, (req, res) => {
    const {articleId} = req.params;
    const post = postService.findOne(articleId);
    if (!post) {
      return res.status(HttpCode.NOT_FOUND)
        .json({
          error: true,
          status: HttpCode.NOT_FOUND,
          message: `Post with id: ${articleId} is not found`
        });
    }
    const comments = commentService.findAll(post);
    return res.status(HttpCode.OK).json(comments);
  });

  postsRouter.delete(`/:articleId/comments/:commentId`, (req, res) => {
    const {articleId, commentId} = req.params;
    const post = postService.findOne(articleId);
    if (!post) {
      return res.status(HttpCode.NOT_FOUND)
        .json({
          error: true,
          status: HttpCode.NOT_FOUND,
          message: `Post with id: ${articleId} is not found`
        });
    }
    const deletedComment = commentService.drop(post, commentId);
    if (!deletedComment) {
      return res.status(HttpCode.NOT_FOUND)
        .json({
          error: true,
          status: HttpCode.NOT_FOUND,
          message: `Comment with id: ${commentId} is not found`
        });
    }
    return res.status(HttpCode.OK).json(deletedComment);
  });

  postsRouter.post(`/:articleId/comments`, commentValidator, (req, res) => {
    const {articleId} = req.params;
    const post = postService.findOne(articleId);
    if (!post) {
      return res.status(HttpCode.NOT_FOUND)
        .json({
          error: true,
          status: HttpCode.NOT_FOUND,
          message: `Post with id: ${articleId} is not found`
        });
    }
    const comment = commentService.create(post, req.body);
    return res.status(HttpCode.CREATED).json(comment);
  });

  postsRouter.get(`/:articleId/comments`, (req, res) => {
    const {articleId} = req.params;
    const postExists = postService.findOne(articleId);
    if (!postExists) {
      return res.status(HttpCode.NOT_FOUND)
        .json({
          error: true,
          status: HttpCode.NOT_FOUND,
          message: `Post with id: ${articleId} is not found`
        });
    }
    const newComment = commentService.create(postExists, req.body);
    return res.status(HttpCode.OK).json(newComment);
  });

  return postsRouter;
};

module.exports = {getPostRouter};
