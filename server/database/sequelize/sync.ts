import { sequelize } from "./initialize-connection"
import Url from "../models/url-model"

export const sequelizeSync = async (): Promise<void> => {
  await sequelize.sync({ force: false, alter: true })
  console.log('Sequelize models synced.')
}
