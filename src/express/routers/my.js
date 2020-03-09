'use strict';

const {Router} = require(`express`);
const myRouter = new Router();

myRouter.get(`/`, (req, res) => res.render(`publication/my`));
myRouter.get(`/comments`, (req, res) => res.render(`publication/comments`));

module.exports = myRouter;
