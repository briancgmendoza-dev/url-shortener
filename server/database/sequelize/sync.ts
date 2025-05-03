import { sequelize } from "./initialize-connection"
import Url from "../models/url-model"

export const sequelizeSync = async (): Promise<void> => {
  await sequelize.sync({ force: true, alter: true })
  console.log('Sequelize models synced.')
}
