import express from 'express';
import startServer from './libs/boot.js';
import injectRoutes from './routes/index.js';
import injectMiddlewares from './libs/middlewares.js';


const server = express();

/**
 * Apply middlewares to the Express server.
 * Middleware functions are used for tasks like parsing request bodies,
 * logging requests, handling CORS, etc.
 */
injectMiddlewares(server);

/**
 * Set up routing for the Express server.
 * This function should include all route definitions for the application.
 */
injectRoutes(server);

/**
 * Start the Express server.
 * The server will listen for incoming requests on the configured port.
 */
startServer(server);

export default server;
