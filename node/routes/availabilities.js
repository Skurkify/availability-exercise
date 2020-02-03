const availabilityModel = require('../models/availability');

module.exports.initializeAvailabilities = function initializeAvailabilities(app) {

    app.get("/availabilities", async (req, res) => {
        try {
            const availabilities = await availabilityModel.getAvailabilities();
            res.send(availabilities);
        } catch(ex) {
            res.status(500).send([])
        }
    });

}