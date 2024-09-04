import { v4 as uuidv4 } from 'uuid';
import dbClient from '../utils/db.js';
import redisClient from '../utils/redis.js';
import { getAuthzHeader, getToken, pwdHashed } from '../utils/utils.js';
import { decodeToken, getCredentials } from '../utils/utils.js';

export default class AuthController {
  /**
   * Handles user sign-in by generating a new authentication token.
   * @param {express.Request} req 
   * @param {express.Response} res 
   */
  static async getConnect(req, res) {
    const authzHeader = getAuthzHeader(req);
    if (!authzHeader) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const token = getToken(authzHeader);
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const decodedToken = decodeToken(token);
    if (!decodedToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const { email, password } = getCredentials(decodedToken);
    const user = await dbClient.getUser(email);
    if (!user || user.password !== pwdHashed(password)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const accessToken = uuidv4();
    await redisClient.set(`auth_${accessToken}`, user._id.toString('utf8'), 60 * 60 * 24);
    res.json({ token: accessToken });
  }

  /**
   * Handles user sign-out by invalidating the authentication token.
   * @param {express.Request} req 
   * @param {express.Response} res 
   */
  static async getDisconnect(req, res) {
    const token = req.headers['x-token'];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const id = await redisClient.get(`auth_${token}`);
    if (!id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const user = await dbClient.getUserById(id);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    await redisClient.del(`auth_${token}`);
    res.status(204).end();
  }

  /**
   * Retrieves the current user's information based on the provided token.
   * @param {express.Request} req 
   * @param {express.Response} res 
   */
  static async getMe(req, res) {
    const token = req.headers['x-token'];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const id = await redisClient.get(`auth_${token}`);
    if (!id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const user = await dbClient.getUserById(id);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    res.json({ id: user._id, email: user.email });
  }
}
