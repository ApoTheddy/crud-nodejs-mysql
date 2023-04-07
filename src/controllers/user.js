const { connection } = require("../db/connection");

let { request, response } = require("express");
const schemaUser = require("../models/user-schema");

// Clase que se utiliza para manejar los controladores de la ruta de user(/src/controllers/user.js)
class UserController {
  findAll(req = request, res = response) {
    let { limit = 10, offset = 0 } = req.query;

    try {
      connection.query(
        `SELECT * FROM users LIMIT ${limit} OFFSET ${offset}`,
        (error, results) => {
          if (error)
            return res.json({
              msg: "Ocurrio un error al obtener los usuarios",
            });
          res.json({ count: results.length, results });
        }
      );
    } catch (error) {
      res.status(500).json({ msg: "Ocurrio un error interno en el servidor" });
    }
  }

  find(req = request, res = response) {
    try {
      let { term } = req.params;
      console.log();

      connection.query(
        `SELECT * FROM users WHERE name LIKE '%${term}%' OR lastname LIKE '%${term}%'`,
        (error, results) => {
          if (error)
            return res.json({
              msg: "Ocurrio un error al obtener el usuario buscado",
            });

          res.json({ count: results.length, results });
        }
      );
    } catch (error) {
      res.status(500).json({ msg: "Ocurrio un error interno en el servidor" });
    }
  }

  create(req = request, res = response) {
    try {
      let { error, value } = schemaUser.validate(req.body);

      if (error)
        return res.json({
          errors: error.details.map((detail) => detail.message),
        });

      connection.query(
        `INSERT INTO users SET id=UUID(), ?`,
        value,
        (error, _ /* Not used*/) => {
          if (error)
            return res.json({ msg: "Ocurrio un error al agregar el usuario" });

          res.json({ msg: "Usuario agregado correctamente" });
        }
      );
    } catch (error) {
      res.status(500).json({ msg: "Ocurrio un error interno en el servidor" });
    }
  }

  update(req = request, res = response) {
    try {
      let { id } = req.params;

      connection.query(
        `SELECT * FROM users WHERE id = '${id}' LIMIT 1`,
        (errorSql, results) => {
          if (errorSql)
            return res.json({ msg: "Ocurrio un error al buscar el usuario" });

          let { error, value } = schemaUser.validate(req.body);

          if (error)
            return res.json({
              errors: error.details.map((detail) => detail.message),
            });

          value = { ...results[0], ...req.body };

          connection.query(
            `UPDATE users SET ? WHERE id='${id}'`,
            value,
            (errorUpdate, _) => {
              if (errorUpdate)
                return res.json({
                  msg: "Ocurrio un error al intentar actualizar el usuario",
                });
              res.json({ msg: "Usuario actualizado correctamente" });
            }
          );
        }
      );
    } catch (error) {
      res.status(500).json({ msg: "Ocurrio un error interno en el servidor" });
    }
  }
  remove(req = request, res = response) {
    try {
      let { id } = req.params;

      connection.query(
        `DELETE FROM users WHERE id = '${id}'`,
        (error, _ /* Not used*/) => {
          if (error)
            return res.json({
              msg: "Ocurrio un error al intentar eliminar el usuario",
            });
          res.json({ msg: "Usuario eliminado correctamente" });
        }
      );
    } catch (error) {
      res.status(500).json({ msg: "Ocurrio un error interno en el servidor" });
    }
  }
}

const userController = new UserController();
module.exports = userController;
