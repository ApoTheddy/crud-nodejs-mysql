const { createConnection } = require("mysql");
const EnvConfiguration = require("../config/env");

class MysqlConnection {
  constructor() {
    this.connection = createConnection({
      host: EnvConfiguration.DB_HOST,
      user: "root",
      password: EnvConfiguration.MYSQL_ROOT_PASSWORD,
      database: EnvConfiguration.MYSQL_DATABASE,
    });
  }

  init() {
    try {
      this.connection.connect();

      this.connection.query(
        `CREATE TABLE IF NOT EXISTS users(id char(32) PRIMARY KEY NOT NULL, name TEXT,lastname TEXT, age INTEGER, phone TEXT, city TEXT)`,
        (error, _ /* Not used */) => {
          if (error)
            throw new Error("Ocurrio un error al crear la tabla 'users'");
        }
      );
      console.log("Conectado correctamente a la base de datos");
    } catch (error) {
      console.log(
        `Ocurrio un error al intentar conectar a la base de datos ${error}`
      );
    }
  }
}

const mysqlConnection = new MysqlConnection();
module.exports = mysqlConnection;
