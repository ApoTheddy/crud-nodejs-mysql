require("dotenv").config();

// Configuracion del archivo .env de nuestro proyecto
const EnvConfiguration = {
  MYSQL_ROOT_PASSWORD: process.env["MYSQL_ROOT_PASSWORD"],
  MYSQL_DATABASE: process.env["MYSQL_DATABASE"],
  DB_HOST: process.env["DB_HOST"],
  MYSQL_PASSWORD: process.env["MYSQL_PASSWORD"],
  PORT: process.env["PORT"],
};

module.exports = EnvConfiguration;
