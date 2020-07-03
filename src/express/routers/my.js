'use strict';

const {Router} = require(`express`);

const getMyRouter = (service) => {
  const myRouter = new Router();
  myRouter.get(`/`, async (req, res, next) => {
    try {
      const posts = await service.getAllPost();
      return res.render(`publication/my`, {posts});
    } catch (err) {
      return next(err);
    }
  });

  myRouter.get(`/comments`, async (req, res, next) => {
    try {
      const posts = await service.getAllPost();
      const postComments = await Promise.all(
          posts.slice(0, 3)
          .map((post) => service.getPostComments(post.id))
      );
      return res.render(`publication/comments`, {comments: postComments.flat()});
    } catch (err) {
      return next(err);
    }
  });
  return myRouter;

};

module.exports = {getMyRouter};
