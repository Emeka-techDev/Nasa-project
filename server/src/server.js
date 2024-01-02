import 'babel-polyfill';
import http from 'http';
import 'dotenv/config';

console.log(`process.env is ${process.env.PORT} ${process.env.MONGO_URL}`)

import app from './app.js';
import { loadHabitablePlanet } from './models/planet.models.js';
import { loadLaunchData } from './models/launch.models.js';
import { mongoConnect } from './services/mongo.js';
// defined a port

const port = process.env.PORT || 8000;

console.log(`port is ${port}`)
// create server
const server = http.createServer(app);

const startServer = async () => {
    await mongoConnect()

    await loadHabitablePlanet();
    await loadLaunchData()
    // listen to the port
    server.listen(port, () => {
        console.log(`app running on port ${port}`)
    })  
}

startServer();


// await loadHabitablePlanet();
// listen to the port

/*
server.listen(port, () => {
    console.log(`app running on port ${port}`)
})

*/