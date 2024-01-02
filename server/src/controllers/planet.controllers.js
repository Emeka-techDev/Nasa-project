import { getAllPlanets } from "../models/planet.models.js";


export const httpGetAllPlanets = async (req, res) => {
    return res.status(200).json(await getAllPlanets())
}

