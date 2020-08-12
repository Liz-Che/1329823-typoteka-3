'use strict';

const {Router} = require(`express`);
const {getMostDiscussedPost} = require(`../../service/cli/utils`);

const getMainRouter = (service) => {
  const mainRouter = new Router();

  mainRouter.get(`/`, async (req, res, next) => {
    try {
      const posts = await service.getAllPost();
      const categories = await service.getAllCategories();
      return res.render(`main/main`, {
        offers: posts.slice(0, 8),
        categories,
        mostDiscussedOffers: getMostDiscussedPost(posts)
      });
    } catch (err) {
      return next(err);
    }
  });

  mainRouter.get(`/login`, (req, res) => res.render(`main/login`));
  mainRouter.get(`/register`, (req, res) => res.render(`main/sing-up`));

  mainRouter.get(`/search`, async (req, res, next) => {
    try {
      const {query} = req.query;
      if (typeof (query) === `undefined`) {
        return res.render(`main/search`);
      }
      const searchResult = await service.searchPost(query);
      //const posts = await service.getAllPost();
      return res.render(`main/search`, {
        posts: searchResult,
        query
        //mostDiscussedOffers: getMostDiscussedPost(posts)
      });
    } catch (err) {
      return next(err);
    }
  });
  return mainRouter;
};

module.exports = {getMainRouter};
