const availabilityModel = require('../models/availability');

module.exports.initializeAvailability = function initializeAvailability(app) {

    app.get("/availability", async (req, res) => {
        try {
            const availabilities = await availabilityModel.getAvailabilities();
            res.send(availabilities);
        } catch(ex) {
            res.status(500).send([])
        }
    });

}