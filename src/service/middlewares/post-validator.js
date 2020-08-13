'use strict';

const {HttpCode} = require(`../../constants`);
const offerKeys = [`title`, `announce`, `fullText`, `createdDate`, `category`, `picture`];

module.exports = (req, res, next) => {
  const newOffer = req.body;
  const keys = Object.keys(newOffer);
  const keysExists = offerKeys.every((key) => keys.includes(key));
  if (!keysExists) {
    return res.status(HttpCode.BED_REQUEST)
      .json({
        error: true,
        status: HttpCode.BED_REQUEST,
        message: `Incorrect data`
      });
  }
  return next();
};
