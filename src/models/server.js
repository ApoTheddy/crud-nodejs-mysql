const express = require("express");
const EnvConfiguration = require("../config/env");
const mysqlConnection = require("../db/connection");
const userRoutes = require("../routes/user");

class Server {
  constructor() {
    mysqlConnection.init();

    this.env = EnvConfiguration;
    this.app = express();

    this.#config();
    this.#routes();
  }

  #config() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  #routes() {
    this.app.use("/users", userRoutes.router);
  }

  start() {
    this.app.listen(this.env.PORT, () => {
      console.log(`Server in port ${this.env.PORT}`);
    });
  }
}

const server = new Server();
module.exports = server;
