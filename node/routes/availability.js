const fetch = require('node-fetch');
const formatAvailabilities = require('../formatters/availability').formatAvailabilities;

module.exports.initializeAvailability = function initializeAvailability(app) {

    app.get("/availability", async (req, res) => {
        try {
            const response = await fetch('https://www.thinkful.com/api/advisors/availability')
            const availabilities = await response.json();
            const formattedAvailabilities = formatAvailabilities(availabilities);
            res.send(formattedAvailabilities);
        } catch(ex) {
            res.status(500).send([])
        }
    });

}