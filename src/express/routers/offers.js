'use strict';

const {Router} = require(`express`);
const offersRouter = new Router();

offersRouter.get(`/add`, (req, res) => res.render(`publication/new-post`));
offersRouter.get(`/:id`, (req, res) => res.render(`publication/articles-by-category`));
offersRouter.get(`/edit/:id`, (req, res) => res.render(`publication/post`));
offersRouter.get(`/category/:id`, (req, res) => res.render(`main/all-categories`));

module.exports = offersRouter;
