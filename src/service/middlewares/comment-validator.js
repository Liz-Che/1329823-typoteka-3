'use strict';

const {HttpCode} = require(`../../constants`);
const commentKeys = [`text`];

module.exports = (req, res, next) => {
  const comment = req.body;
  const keys = Object.keys(comment);
  const keysExists = commentKeys.every((key) => keys.includes(key));
  if (!keysExists) {
    res.status(HttpCode.BED_REQUEST)
      .json({
        error: true,
        status: HttpCode.BED_REQUEST,
        message: `Incorrect comment data`
      });
  }
  return next();
};
