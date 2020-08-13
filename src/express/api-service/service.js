'use strict';

class ApiService {
  constructor(api) {
    this._api = api;
  }
  async getAllPost() {
    return await this._api.get(`/articles`);
  }
  async getPostById(articleId) {
    return await this._api.get(`/articles/${articleId}`);
  }
  async createNewPost(articleData) {
    return await this._api.post(`/articles`, articleData);
  }
  async getAllCategories() {
    return await this._api.get(`/categories`);
  }
  async searchPost(query) {
    return await this._api.get(`/search?query=${encodeURI(query)}`);
  }
  async getPostComments(articleId) {
    return await this._api.get(`/articles/${articleId}/comments`);
  }
}

module.exports = ApiService;
