const axios = require('axios');
const launchesSchema = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER= 100;

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';

async function populateLaunches() {
    const response = await axios.post( SPACEX_API_URL , {
        qurey:{},
        options:{
            pagination: false,
            populate:[
                {
                    path:'rocket',
                    select:{
                        name:1
                    }
                },{
                    path:'payloads',
                    select:{
                        'customers':1
                    }
                },
                
            ]
        }
    })

    if (response.status !== 200) {
        throw new Error ('Launch data failed!');
    }

    const launchDocs = response.data.docs;
    for (const launchDoc of launchDocs ) {
        const payloads = launchDoc['payloads'];
        const customers = payloads.flatMap((payload)=> {
            return payload['customers'];
        });

        const launch = {
            flightNumber: launchDoc['flightNumber'],
            mission: launchDoc['name'], 
            rocket: launchDoc['rocket']['name'],
            launchDate: launchDoc['date_local'], 
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'],
            customers,
        }
        // save
        await saveLaunch(launch);
    } 
}

async function loadLaunchData () {
    const firstLaunch  = await findLaunch({
        flightNumber:1,
        rocket:'Falcon 1', 
        mission:'FalconSat'
    });

    if (!firstLaunch) {
        await populateLaunches();
    }
}

async function saveLaunch(launch) {
    await launchesSchema.findOneAndUpdate({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert:true
    });
}

async function findLaunch (filter) {
    return await launchesSchema.findOne(filter)
}

async function existsLaunchWithId (launchId) {
    return await findLaunch({flightNumber: launchId});
}

async function getAllLaunches(skip, limit) {
    return await launchesSchema
    .find( {}, {'_id':0,'_v':0} )
    .sort({flightNumber:1})
    .skip(skip)
    .limit(limit);

}

async function addNewLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target
    });

    if (!planet) {
        throw new Error ('No matching planet found');
    }
    const newFlightNumber = await getLastestFlightNumber() + 1;
    const newLaunch = Object.assign(launch, {
        success:true,
        upcoming:true,
        customers:['Zero to Mastery', 'NASA'],
        flightNumber: newFlightNumber
    }) 

    await saveLaunch(newLaunch)

}

async function getLastestFlightNumber () {
    const lastestLaunch = await launchesSchema.findOne().sort('-flightNumber')
    if (!lastestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }
    return lastestLaunch.flightNumber;
}

async function abortLaunchById (launchId) {
   const arborted = await launchesSchema.updateOne({
    flightNumber: launchId
   }, {
    upcoming:true,
    success:true
   });

   return arborted.modifiedCount === 1;
}

module.exports = {
    loadLaunchData,
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortLaunchById
}