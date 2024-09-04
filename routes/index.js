#!/usr/bin/node
import express from 'express';
import AppController from '../controllers/AppController.js';
import UsersController from '../controllers/UsersController.js';
import AuthController from '../controllers/AuthController.js';

const router = express.Router();

/**
 * Route for checking the server status.
 * GET /status
 * @see AppController.getStatus
 */
router.get('/status', AppController.getStatus);

/**
 * Route for retrieving application statistics.
 * GET /stats
 * @see AppController.getStats
 */
router.get('/stats', AppController.getStats);

/**
 * Route for creating a new user.
 * POST /users
 * @see UsersController.postNew
 */
router.post('/users', UsersController.postNew);

/**
 * Route for connecting a user.
 * GET /connect
 * @see AuthController.getConnect
 */
router.get('/connect', AuthController.getConnect);

/**
 * Route for disconnecting a user.
 * GET /disconnect
 * @see AuthController.getDisconnect
 */
router.get('/disconnect', AuthController.getDisconnect);

/**
 * Route for retrieving the current user's information.
 * GET /users/me
 * @see UsersController.getMe
 */
router.get('/users/me', UsersController.getMe);

export default router;

