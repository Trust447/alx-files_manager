#!/usr/bin/node

import { createClient } from "redis";
import { promisify } from "util";

/**
 * Redis client class.
 */
class RedisClient {
    /**
     * RedisClient constructor.
     */
    constructor() {
        this.client = createClient();
        this.connected = false; 

        this.client.on('error', (err) => {
            console.error('Redis Client Error:', err);
        });

        this.client.on('connect', () => {
            this.connected = true;
            console.log('Connected to Redis...');
        });
    }

    /**
     * Checks if connection to the Redis server is active.
     * @returns {boolean} true if connected, else false
     */
    isAlive() {
        return this.client.connected;
    }

    /**
     * Gets value for the key from Redis.
     * @param {string} key 
     * @returns {Promise<string | null>}
     */
    async get(key) {
        const getAsync = promisify(this.client.get).bind(this.client);
        const value = await getAsync(key);
        return value;
    }

    /**
     * Sets a value in Redis with a specified expiration time.
     * @param {string} key - The key under which the value will be stored.
     * @param {string} val - The value to store.
     * @param {number} dur - Expiration time in seconds.
     * @returns {Promise<void>}
     */
    async set(key, val, dur) {
        const setAsync = promisify(this.client.set).bind(this.client);
        await setAsync(key, val, 'EX', dur);
    }

    /**
     * Deletes a key from Redis.
     * @param {string} key - The key to delete.
     * @returns {Promise<void>}
     */
    async del(key) {
        const delAsync = promisify(this.client.del).bind(this.client);
        await delAsync(key);
    }
}

export const redisClient = new RedisClient();
export default redisClient;
