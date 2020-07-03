'use strict';

const {getNewId} = require(`../cli/utils`);

class PostService {
  constructor(articles) {
    this._articles = articles;
  }

  create(article) {
    const newArticle = {
      ...article,
      id: getNewId(),
      comments: []
    };
    this._articles.push(newArticle);
    return newArticle;
  }

  update(articleId, articleData) {
    const oldArticle = this._articles.find((article) => article.id === articleId);
    return Object.assign(oldArticle, articleData);
  }

  drop(articleId) {
    const deletedArticle = this._articles.find((article) => article.id === articleId);
    this._articles = this._articles.filter((article) => article.id !== articleId);
    return deletedArticle;
  }

  findOne(articleId) {
    return this._articles.find((article) => article.id === articleId);
  }

  findAll() {
    return this._articles;
  }
}

module.exports = PostService;
