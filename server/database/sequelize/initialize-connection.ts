import { Sequelize } from "sequelize"
import { MYSQL_DB, MYSQL_USER, MYSQL_PW, MYSQL_HOST } from "../../config/load-env"

export const sequelize = new Sequelize(
  MYSQL_DB!,
  MYSQL_USER!,
  MYSQL_PW!,
  {
    host: MYSQL_HOST,
    dialect: 'mysql',
    logging: (msg) => console.log('@@ Sequelize Logger: ', msg),
  }
)
