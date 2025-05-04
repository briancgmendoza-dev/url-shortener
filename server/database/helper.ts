import { sequelize } from "./sequelize/initialize-connection"
import { MYSQL_DB } from "../config/load-env"

export const createDbIfNotExists = async (): Promise<void> => {
  try {
    const [results] = await sequelize.query(`SHOW DATABASES LIKE '${MYSQL_DB}'`)
    if (results.length > 0) {
      console.log(`${MYSQL_DB} already exists`)
    } else {
      console.log(`${MYSQL_DB} doesn't exist. Creating...`)
      await sequelize.query(`CREATE DATABASE ${MYSQL_DB}`)
      console.log(`${MYSQL_DB} Created successfully.`)
    }
  } catch (error) {
    console.error('Error checking or creating db', error)
    process.exit(1)
  }
}
