import express from 'express';

import planetRouter from "./planetRoutes/planet.routes.js";
import launchRouter from "./launchesERoutes/launch.routes.js";

const api = express.Router();

api.use('/planets', planetRouter);
api.use('/launches', launchRouter)

export default api;