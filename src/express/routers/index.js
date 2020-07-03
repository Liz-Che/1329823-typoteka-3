'use strict';

const {getMainRouter} = require(`./main`);
const {getMyRouter} = require(`./my`);
const {getOffersRouter} = require(`./offers`);

module.exports = {
  getMainRouter,
  getMyRouter,
  getOffersRouter
};
