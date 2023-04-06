const Joi = require("joi");

const schemaUser = Joi.object({
  name: Joi.string(),
  lastname: Joi.string(),
  age: Joi.number(),
  phone: Joi.string(),
  city: Joi.string(),
});

module.exports = schemaUser;
