import express from 'express';
import { httpGetAllPlanets } from '../../controllers/planet.controllers.js'

const planetRouter = express.Router();

planetRouter.route('/')
    .get(httpGetAllPlanets)

export default planetRouter