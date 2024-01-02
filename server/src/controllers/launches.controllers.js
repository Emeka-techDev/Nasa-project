import { addNewLaunch , getAllLaunches, abortLaunch, hasLaunch } from "../models/launch.models.js";
import getPagination from "../services/query.js";


// error with this method as the schedule launch returns nothing 
export const httpAddNewLaunch = async (req, res) => {
    const launch = req.body;
    
    launch.launchDate = new Date(launch.launchDate);
    
    /*
    if ( launch.launchDate.toString() === 'invalid Date' ) {
        return res.status(400).json({
            error: 'Invalid launch date'
        })
    }
    */

    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target ) {
        return res.status(404).json({
            error: 'missing required launch property'
        })
    }
    
    if ( isNaN(launch.launchDate)  ) {
        return res.status(400).json({
            error: 'Invalid launch date'
        })
    }
    
    await addNewLaunch(launch);

  // console.log(`scheduled launch is ${scheduleLaunch}`)
    
    return res.status(201).json(launch);
}

export const httpGetAllLaunches = async (req, res) => {
    //console.log(req.query)
    const { skip, limit } = await getPagination(req.query)
   // console.log(`result is ${result.skip} ${result.limit}`);
    
    //console.log(`skip is ${skip} \n limit is ${limit}`)
    const launches = await getAllLaunches(skip, limit)
    
    return res.status(200).json(launches);
}

export const httpAbortLaunch = async (req, res) => {
    const { id } = req.params;
    const launchId = Number(id);

    if ( !(await hasLaunch( launchId )) ) {
        return res.status(404).json({
            err: 'launch not found'
        })
    }

    const abortedLaunch = abortLaunch(launchId)
    if (!abortedLaunch) {
        return res.status(400).json({
            error: 'Launch not aborted'
        })
    }
    
    // console.log(`controller aborted launch is ${abortedLaunch}`);
    return res.status(200).json({
        ok: true
    });


}