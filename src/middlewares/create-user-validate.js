const { body } = require("express-validator");
const validateMiddleware = require("./validate-middleware");

let to_verify = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("No se encontro el parametro 'name'"),
  body("lastname")
    .not()
    .isEmpty()
    .withMessage("No se encontro el parametro 'lastname'"),
  body("age").not().isEmpty().withMessage("No se encontro el parametro 'age'"),
  validateMiddleware,
];

module.exports = to_verify;
