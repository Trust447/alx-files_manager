import dbClient from '../utils/db.js';

export default class UsersController {
  /**
   * Handles the creation of a new user.
   * @param {express.Request} req 
   * @param {express.Response} res 
   */
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }
    
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    const userExist = await dbClient.userExist(email);
    if (userExist) {
      return res.status(400).json({ error: 'Already exist' });
    }

    const user = await dbClient.createUser(email, password);
    const id = `${user.insertedId}`;
    res.status(201).json({ id, email });
  }
}
