'use strict';

const {Router} = require(`express`);
const searchRouter = new Router();
const {HttpCode} = require(`../../constants`);

const getSearchRouter = (searchService) => {
  searchRouter.get(`/`, (req, res) => {
    const {query} = req.query;
    if (typeof (query) === `undefined`) {
      return res.status(HttpCode.BAD_REQUEST)
      .json({
        error: true,
        status: HttpCode.BAD_REQUEST,
        message: `Incorrect data sent`
      });
    }
    const searchResults = searchService.findAll(query);
    return res.status(HttpCode.OK).json(searchResults);
  });
  return searchRouter;
};

module.exports = {getSearchRouter};
