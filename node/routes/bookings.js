const bookingModel = require('../models/booking');

module.exports.initializeBookings = function initializeBookings(app) {

    app.get("/bookings", async (req, res) => {
        try {
            const bookings = bookingModel.getBookings();
            res.send(bookings);
        } catch(ex) {
            res.status(500).send([])
        }
    });

    app.post("/bookings", async (req, res) => {
        try {
            const booking = req.body;
            bookingModel.createBooking(booking);
            res.status(200).send();
        } catch(ex) {
            res.status(400).send(ex.message)
        }
    });

}
