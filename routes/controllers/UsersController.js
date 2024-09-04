import dbClient from '../utils/db.js'; 

/**
 * UsersController class handles user-related operations.
 */
class UsersController {
  /**
   * Creates a new user.
   * Handles the POST request to /api/users.
   * 
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {void} - Sends a response to the client.
   */
  static async postNew(req, res) {
    // Destructure email and password from the request body
    const { email, password } = req.body;

    // Check if email is provided
    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    // Check if password is provided
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    // Check if user already exists
    const userExist = await dbClient.userExist(email);
    if (userExist) {
      return res.status(400).json({ error: 'Already exists' });
    }

    // Create a new user in the database
    const user = await dbClient.createUser(email, password);
    const id = `${user.insertedId}`;

    // Respond with the created user's ID and email
    return res.status(201).json({ id, email });
  }
}

export default UsersController;
