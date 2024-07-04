const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || '27017';
    const dbName = process.env.DB_DATABASE || 'files_manager';

    this.uri = `mongodb://${host}:${port}`;
    this.client = new MongoClient(this.uri, { useNewUrlParser: true, useUnifiedTopology: true });
    this.dbName = dbName;
    this.db = null;
  }

  async connect() {
    try {
      await this.client.connect();
      console.log("Connected successfully to the database");
      this.db = this.client.db(this.dbName);
    } catch (error) {
      console.error("Failed to connect to the database", error);
    }
  }

  isAlive() {
    return this.client && this.client.topology && this.client.topology.isConnected();
  }

  async nbUsers() {
    try {
      const collection = this.db.collection('users');
      const count = await collection.countDocuments();
      return count;
    } catch (error) {
      console.error("Failed to count documents in users collection", error);
      return 0;
    }
  }

  async nbFiles() {
    try {
      const collection = this.db.collection('files');
      const count = await collection.countDocuments();
      return count;
    } catch (error) {
      console.error("Failed to count documents in files collection", error);
      return 0;
    }
  }
}

const dbClient = new DBClient();
dbClient.connect(); // Establish connection immediately

module.exports = dbClient;
