'use strict';

const {Router} = require(`express`);
const mainRouter = new Router();

mainRouter.get(`/`, (req, res) => res.render(`main/main`));
mainRouter.get(`/login`, (req, res) => res.render(`main/login`));
mainRouter.get(`/register`, (req, res) => res.render(`main/sing-up`));
mainRouter.get(`/search`, (req, res) => res.render(`main/search`));

module.exports = mainRouter;
