'use strict';

const {getCategoryRouter} = require(`./categories`);
const {getSearchRouter} = require(`./search`);
const {getPostRouter} = require(`./posts`);

module.exports = {
  getCategoryRouter,
  getSearchRouter,
  getPostRouter
};
