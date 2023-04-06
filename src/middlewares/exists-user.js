const { request, response } = require("express");
const { connection } = require("../db/connection");

const exists_user = (req = request, res = response, next) => {
  let { id } = req.params;

  connection.query(`SELECT * FROM users WHERE id='${id}'`, (error, results) => {
    if (error)
      return res.json({ msg: "Ocurrio un error al buscar el usuario" });
    if (results.length === 0)
      return res.json({ msg: "No se encontro ningun usuario para actualizar" });
    next();
  });
};

module.exports = exists_user;
