import { redisClient } from "../config/redis-client";

export const getFromCache = async (key: string): Promise<string | null> => {
  return await redisClient.get(key)
}

export const setToCache = async (key: string, value: string, expiry: number): Promise<void> => {
  await redisClient.set(key, value, 'EX', expiry)
}

export const deleteFromCache = async (key: string): Promise<void> => {
  await redisClient.del(key)
}
