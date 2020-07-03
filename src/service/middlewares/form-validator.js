'use strict';

const {check} = require(`express-validator`);

const newOfferFormFields = [
  check(`title`, `Name post`).trim().notEmpty(),

  check(`announce`)
    .trim()
    .notEmpty()
    .withMessage(`Enter ad announce`)
    .bail()
    .isLength({
      min: 30,
      max: 250
    })
    .withMessage(`Ad announce must be at least from 30 to 250 characters`),

  check(`createdDate`)
    .notEmpty()
    .withMessage(`Введите дату`)
    .bail()
    .custom((value) => {
      const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[\.](0?[1-9]|1[012])[\.]\d{4}$/;
      return dateRegex.test(value);
    })
    .withMessage(`Неверный формат даты`),

  check(`category`, `Select at least one category for your ad`).exists().bail().isArray({min: 1}),

  check(`fullText`, `Full text should contain a maximum of 1000 characters`)
    .trim()
    .notEmpty()
    .withMessage(`Enter ad fullText`)
    .bail()
    .isLength({max: 1000}),
];

module.exports = {newOfferFormFields};
