import axios from 'axios';
import Launch from "./launch.mongo.js";
import Planet from './planet.mongo.js';
import { response } from 'express';

const  DEFAULT_FLIGHT_NUMBER = 100; 

export const launches = new Map();

const findLaunch = async (filter) => {
    return await Launch.findOne(filter)
}

export const hasLaunch = async ( launchId ) => {
    let launch = await findLaunch({ flightNumber: launchId });
    console.log(`launch is ${launch}`);

    return launch
}

const saveLaunch = async (launch) => {
  
    const response = await Launch.updateOne({
        flightNumber: launch.flightNumber
    
        }, launch , {
            
            upsert: true
    })
    console.log(`response returned by the saveLaunch function is ${JSON.stringify(response)}`);
    return response;
      
}

// there is a problem with the abortLaunch as we
// have to confirm this acknowledge and matchedCount property

export const abortLaunch = async ( launchId ) => {
    console.log(`abort launch is running`)
    let launchNumber = Number(launchId);

    let launch = await Launch.updateOne({ flightNumber: launchNumber }, {
        success: false,
        upcoming: false,
    });

    console.log(`aborted Launch is ${JSON.stringify(launch)}`)
    return launch.acknowledged && launch.matchedCount;

} 



const getLatestFlightNumber = async () => {
    let latestFlightNumber =  await Launch.findOne({}).sort('-flightNumber')

    if (!latestFlightNumber) {
        return DEFAULT_FLIGHT_NUMBER;
    }
    return latestFlightNumber.flightNumber;
}

const scheduleNewLaunch = async (launch) => {
    
    try {
        
        let planet = await Planet.findOne({ keplerName: launch.target });
        
        //console.log(`planet is ${!planet}`);

        if (!planet) {
            console.log(`error about to run`)
            throw new Error('invalid target planet');

        } 
    
        const newFlightNumber = await getLatestFlightNumber() + 1;

        const newLaunch = Object.assign(launch, {
            success: true,
            upcoming: true,
            customers:  ['Emeka', 'Ebuka'],
            flightNumber: newFlightNumber
        })
       
        saveLaunch(newLaunch);

    } catch (err) {
        console.log(err)
    
    }
    
   

}


export const addNewLaunch = async (launch) => {
    
    return await scheduleNewLaunch(launch)

}

export const getAllLaunches = async (skip, limit) => { 
   
    let foundPlanet = await Launch.find({}, '-_id -__v' ).sort({flightNumber: 1}).limit(limit).skip(skip);

    return foundPlanet;
} 


const spaceXApiURL = 'https://api.spacexdata.com/v4/launches/query'

const populateLaunches = async () => {
    const responses = await axios.post(spaceXApiURL, {
        query : {},
        options: {
            pagination: false,
            populate: [
                {
                    path: 'rocket',
                    select: {
                        name : 1
                    }
                }, 
                
                {
                    path: 'payloads',
                    select: {
                        customers: 1
                    }
                }
            ]
        }
    })


    // if ( response.status !== 200 )  {
    //     console.log(`Problem in querying SpaceX_API`)
    //     throw new Error(`Launch data download failed`)
    // }

    const launchDocs = responses.data.docs
    
    for (let launchDoc of launchDocs ) {
        let customers = launchDoc.payloads.flatMap( payload => payload.customers )
        console.log(`customers are ${customers}`)
        let launch = {
            flightNumber: launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            upcoming: launchDoc['upcoming'],
            launchDate: launchDoc['date_local'],
            success: launchDoc['success'],
            customers
        }


       console.log(`${launch.flightNumber}: ${launch.customers}`)
       await saveLaunch(launch)
    }
}



export const loadLaunchData = async () => {
    
    let launch = await findLaunch({
        flightNumber: 1,
        rocket: 'Falcon 1',
        mission: 'FalconSat'
    })

    console.log(`found launch is ${launch}`)

    if (launch) {
        console.log(`launch already loaded`)
    } else {
        populateLaunches();
    }

}