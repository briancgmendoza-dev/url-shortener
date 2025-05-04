import { sequelize } from "./initialize-connection"

export const sequelizeAuthenticate = async (): Promise<void> => {
  await sequelize.authenticate()
  console.log('Db connection has been established successfully.')
}
