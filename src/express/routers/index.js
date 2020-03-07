'use strict';

const {Router} = require(`express`);
const mainRouter = require(`./main`);
const myRouter = require(`./my`);
const offersRouter = require(`./offers`);

const router = new Router();

router.use(`/`, mainRouter);
router.use(`/my`, myRouter);
router.use(`/offers`, offersRouter);

module.exports = router;
