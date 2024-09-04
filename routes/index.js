import express from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';

// Create a new Express Router instance
const router = express.Router();

/**
 * Route for checking the server status.
 * GET /api/status
 * @see AppController.getStatus
 */
router.get('/status', AppController.getStatus);

/**
 * Route for retrieving application statistics.
 * GET /api/stats
 * @see AppController.getStats
 */
router.get('/stats', AppController.getStats);

/**
 * Route for creating a new user.
 * POST /api/users
 * @see UsersController.postNew
 * @param {string} name - The name of the new user.
 * @param {string} email - The email of the new user.
 */
router.post('/users', UsersController.postNew);

/**
 * Route for connecting a user.
 * GET /api/connect
 * @see AuthController.getConnect
 */
router.get('/connect', AuthController.getConnect);

/**
 * Route for disconnecting a user.
 * GET /api/disconnect
 * @see AuthController.getDisconnect
 */
router.get('/disconnect', AuthController.getDisconnect);

/**
 * Route for retrieving the current user's information.
 * GET /api/users/me
 * @see AuthController.getMe
 */
router.get('/users/me', AuthController.getMe);

// Export the router for use in the main application file
export default router;
