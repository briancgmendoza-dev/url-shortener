import { sequelize } from "./sequelize/initialize-connection"
import { sequelizeAuthenticate } from "./sequelize/authenticate"
import { sequelizeSync } from "./sequelize/sync"
import { createDbIfNotExists } from "./helper"

const connectDb = async (): Promise<void> => {
  try {
    await createDbIfNotExists()
    await sequelizeAuthenticate()

    const [results] = await sequelize.query("SELECT DATABASE();");
    console.log("Currently connected to database: ", results);

    await sequelizeSync()
  } catch (error) {
    console.error('Unable to connect to the database: ', error)
    process.exit(1)
  }
}

export { sequelize, connectDb }
