'use strict';

const {Router} = require(`express`);
const {newOfferFormFields} = require(`../../service/middlewares/form-validator`);
const {validationResult} = require(`express-validator`);

const getOffersRouter = (service) => {
  const offersRouter = new Router();

  offersRouter.get(`/category/:id`, (req, res) => res.render(`main/all-categories`));

  offersRouter.get(`/add`, async (req, res, next) => {
    try {
      const categories = await service.getAllCategories();
      return res.render(`publication/new-post`, {categories});
    } catch (err) {
      return next(err);
    }
  });

  offersRouter.post(`/add`, ...newOfferFormFields, async (req, res, next) => {
    try {
      const errorFormat = ({msg}) => ({msg});
      const errors = validationResult(req).formatWith(errorFormat).array();
      if (Object.keys(errors).length) {
        const categories = await service.getAllCategories();
        return res.render(`publication/new-post`, {errors, categories});
      }
      await service.createNewPost();
      return res.redirect(`/my`);
    } catch (err) {
      return next(err);
    }
  });

  offersRouter.get(`/edit/:id`, async (req, res, next) => {
    try {
      const postId = req.params.id;
      const post = await service.getPostById(postId);
      const categories = await service.getAllCategories();
      return res.render(`publication/post`, {post, categories});
    } catch (err) {
      return next(err);
    }
  });

  offersRouter.get(`/:id`, (req, res) => res.render(`publication/articles-by-category`));

  return offersRouter;

};

module.exports = {getOffersRouter};
