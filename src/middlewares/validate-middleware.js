const { validationResult } = require("express-validator");

const validateMiddleware = (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) return res.json({ errors: errors.array() });
  next();
};

module.exports = validateMiddleware;
