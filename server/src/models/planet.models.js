import fs from 'fs';
import { parse } from 'csv-parse';
import path from 'path';
import { fileURLToPath } from 'url';
import Planet from './planet.mongo.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const checkInhabit = (planet) => {
    return planet['koi_disposition'] == 'CONFIRMED' 
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6
}


const savePlanet = async(Model, data) => {
    try {
        await Model.findOneAndUpdate({
            keplerName: data.kepler_name
        }, {
            keplerName: data.kepler_name
        }, {
            upsert: true
        });

    } catch (err) {
        console.log(`couldn't save planets ${err}`)
    }
    
}


const getAllPlanets = async () => {
    const planets = await Planet.find({},'-_id -__v' );
    return planets;
}

const loadHabitablePlanet = async () => {
    
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..' , '..', 'data' , 'kepler_data.csv'))
        .pipe(parse({
            comment: '#',
            columns: true
        }))
        .on('data', async (data) => {
            if (checkInhabit(data)) {
                await savePlanet(Planet, data)
            }
        
        })
        .on('end', async () => {
            console.log(`${(await getAllPlanets()).length}  habitable planets found `);
            resolve();
            //console.log('done');
        })
        .on('error', (err) => {
            console.log(err);
            reject(err);
        })
    })

}





export { getAllPlanets, loadHabitablePlanet }