import express from "express";
import { httpAddNewLaunch, httpGetAllLaunches, httpAbortLaunch } from "../../controllers/launches.controllers.js";

const launchRouter = express.Router();

// the post failed has an incomplete returned submitted or updated model request
launchRouter.route('/')
    .get(httpGetAllLaunches)
    .post(httpAddNewLaunch)

launchRouter.route('/:id')
    .delete(httpAbortLaunch)

export default launchRouter;