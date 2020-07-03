'use strict';

const nanoId = require(`nanoid`);
const moment = require(`moment`);

const getReandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.ceil(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (array) => {
  for (let index = array.length - 1; index > 0; index--) {
    const randomPos = Math.floor(Math.random() * index);
    [array[index], array[randomPos]] = [array[randomPos], array[index]];
  }
  return array;
};

const getNewId = () => {
  return nanoId(6);
};

const getMostDiscussedPost = (offers) => {
  return offers.filter((offer) => offer.comments.length > 0).sort((a, b) => b.comments.length - a.comments.length).slice(0, 8);
};

const formatArticleDate = (articleData) => {
  const DATE_FORMAT = `DD.MM.YYYY, HH:mm`;
  const makeDateFormat = (date) => moment(date).format(DATE_FORMAT);
  if (Array.isArray(articleData)) {
    const newArticleList = copyObject(articleData);
    return newArticleList.map((article) => {
      article.createdDate = makeDateFormat(article.createdDate);
      return article;
    });
  }
  return {...articleData, createdDate: makeDateFormat(articleData.createdDate)};
};

module.exports = {getReandomInt, shuffle, getNewId, getMostDiscussedPost, formatArticleDate};
