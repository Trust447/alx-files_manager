#!/usr/bin/node
import redisClient from '../utils/redis.js';
import dbClient from '../utils/db.js';

/**
 * AppController handles application-related routes.
 */
class AppController {
  /**
   * Handles GET requests to /status.
   * Checks the status of the Redis and database connections.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  static getStatus(req, res) {
    if (redisClient.isAlive() && dbClient.isAlive()) {
      res.json({ redis: true, db: true });
    } else {
      res.json({ redis: false, db: false });
    }
    res.end();
  }

  /**
   * Handles GET requests to /stats.
   * Retrieves and returns the number of users and files.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  static async getStats(req, res) {
    try {
      const users = await dbClient.nbUsers();
      const files = await dbClient.nbFiles();
      res.json({ users, files });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve stats' });
    }
    res.end();
  }
}

export default AppController;
