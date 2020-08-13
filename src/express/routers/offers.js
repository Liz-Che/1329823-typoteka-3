'use strict';

const {Router} = require(`express`);
const {newPostsFormFields} = require(`../../service/middlewares/form-validator`);
const {validationResult} = require(`express-validator`);
const {multer, storage} = require(`../file-loader`);
const {convertDate} = require(`../../service/cli/utils`);
const upload = multer({storage}).single(`picture`);

const MAX_PICTURE_SIZE = 15 * 1024 * 1024;
const SIZE_MEGABITE = 1048576;
const FILE_TYPES = [`image/png`, `image/jpg`, `image/jpeg`];

const getPostsRouter = (service) => {
  const offersRouter = new Router();

  offersRouter.get(`/category/:id`, (req, res) => res.render(`publication/articles-by-category`));

  offersRouter.get(`/add`, async (req, res, next) => {
    try {
      const categories = await service.getAllCategories();
      return res.render(`publication/new-post`, {categories});
    } catch (err) {
      return next(err);
    }
  });

  offersRouter.post(`/add`, upload, ...newPostsFormFields, async (req, res, next) => {
    try {
      const fileErrorMsg = `Invalid format (only jpg/jpeg/png), big size file (max: ${MAX_PICTURE_SIZE / SIZE_MEGABITE} Mb)`;
      const errorsListFormatter = ({msg}) => msg;
      const errors = {
        errorsList: validationResult(req).formatWith(errorsListFormatter).array(),
        errorByField: validationResult(req).mapped()
      };

      const file = req.file;
      let formFieldsData = {...req.body};
      if (file && (!FILE_TYPES.includes(file.mimetype) || file.size > MAX_PICTURE_SIZE)) {
        errors.errorsList.push(fileErrorMsg);
        errors.errorByField.picture = {msg: fileErrorMsg};
      }
      formFieldsData = {
        ...formFieldsData,
        picture: file ? {image: file.filename, image2x: file.filename} : null
      };

      if (errors.errorsList.length || Object.keys(errors.errorByField).length) {
        const categories = await service.getAllCategories();
        return res.render(`publication/new-post`, {errors, categories, formFieldsData});
      }
      formFieldsData = {
        ...formFieldsData,
        createdDate: convertDate(formFieldsData.createdDate)
      };

      await service.createNewPost(formFieldsData);
      return res.redirect(`publication/my`);
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

  offersRouter.get(`/:id`, (req, res) => res.render(`publication/post`));

  return offersRouter;

};

module.exports = {getPostsRouter};
