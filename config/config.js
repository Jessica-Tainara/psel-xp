const dotenv = require('dotenv');
dotenv.config();
const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB_NAME } = process.env;

module.exports = {
  development: {
    username: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DB_NAME,
    host: MYSQL_HOST,
    dialect: "mysql",
  },
  test: {
    username: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DB_NAME,
    host: MYSQL_HOST,
    dialect: "mysql"
  },
  production: {
    username: MYSQL_HOST,
    password: MYSQL_PASSWORD,
    database: MYSQL_DB_NAME,
    host: MYSQL_HOST,
    dialect: "mysql"
  }
}
