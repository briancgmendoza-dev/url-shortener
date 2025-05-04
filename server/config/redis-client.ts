import Redis from 'ioredis'
import { REDIS_HOST, REDIS_PORT, REDIS_PW } from './load-env'

export const redisClient = new Redis({
  host: REDIS_HOST!,
  port: +REDIS_PORT!,
  password: REDIS_PW!
})
