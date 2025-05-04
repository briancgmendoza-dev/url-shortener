import dotenv from 'dotenv'

dotenv.config()

export const {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PW,
  MYSQL_DB,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PW,
  BASE_URL,
  PORT
} = process.env
