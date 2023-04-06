const { response, request } = require("express");
const uuid = require("uuid");

const validateUUUID = (req = request, res = response, next) => {
  let { id } = req.params;
  if (!uuid.validate(id))
    return res.json({ msg: `El id: ${id}, es incorrecto` });
  next();
};

module.exports = validateUUUID;
