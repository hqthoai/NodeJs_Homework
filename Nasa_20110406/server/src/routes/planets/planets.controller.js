const { getAllLaunches } = require('../../models/planets.model');


function httpGetAllPlanets (req, res) {
    return res.status(200).json(getAllLaunches());
}

module.exports = { 
    httpGetAllPlanets,
 };