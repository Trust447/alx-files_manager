const { isRedisAlive, isDbAlive, nbUsers, nbFiles } = require('../utils');

const AppController = {
  getStatus: async (req, res) => {
    try {
      const redisAlive = await isRedisAlive();
      const dbAlive = await isDbAlive();

      res.status(200).json({ redis: redisAlive, db: dbAlive });
    } catch (error) {
      console.error('Failed to check status:', error);
      res.status(500).json({ error: 'Failed to check status' });
    }
  },

  getStats: async (req, res) => {
    try {
      const usersCount = await nbUsers();
      const filesCount = await nbFiles();

      res.status(200).json({ users: usersCount, files: filesCount });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      res.status(500).json({ error: 'Failed to fetch stats' });
    }
  },
};

module.exports = AppController;