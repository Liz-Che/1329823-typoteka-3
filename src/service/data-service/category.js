'use strict';

class CategoryService {
  constructor(offers) {
    this._offers = offers;
  }
  findAll() {
    const categories = this._offers.reduce((categoriesList, offer) => {
      categoriesList.add(...offer.category);
      return categoriesList;
    }, new Set());
    return [...categories];
  }
}

module.exports = CategoryService;
