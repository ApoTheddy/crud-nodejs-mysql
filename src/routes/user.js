const { Router } = require("express");

const userCtrl = require("../controllers/user");
const existsUser = require("../middlewares/exists-user");
const validateUUUID = require("../middlewares/validate-uuid");
const to_verify = require("../middlewares/create-user-validate");

class UserRoutes {
  constructor() {
    this.router = Router();
    this.connection;
    this.routes();
  }

  routes() {
    // Get Users
    this.router.get("/", userCtrl.findAll);
    this.router.get("/:term", userCtrl.find);
    this.router.post("/", to_verify, userCtrl.create);
    this.router.put("/:id", [validateUUUID, existsUser], userCtrl.update);
    this.router.delete("/:id", [validateUUUID, existsUser], userCtrl.remove);
  }
}

const userRoutes = new UserRoutes();
module.exports = userRoutes;
