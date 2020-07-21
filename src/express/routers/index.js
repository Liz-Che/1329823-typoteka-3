'use strict';

const {getMainRouter} = require(`./main`);
const {getMyRouter} = require(`./my`);
const {getPostsRouter} = require(`./offers`);
const {getCategoriesRouter} = require(`./categories`);

module.exports = {
  getMainRouter,
  getMyRouter,
  getPostsRouter,
  getCategoriesRouter
};
