const bookingModel = require('../models/booking');

module.exports.initializeBookings = function initializeBookings(app) {

    app.get("/booking", async (req, res) => {
        try {
            const bookings = bookingModel.getBookings();
            res.send(bookings);
        } catch(ex) {
            res.status(500).send([])
        }
    });

    app.post("/booking", async (req, res) => {
        try {
            const booking = req.body;
            console.log(booking);
            bookingModel.createBooking(booking);
            res.status(200).send();
        } catch(ex) {
            res.status(400).send(ex.message)
        }
    });

}
/*
    todo:
    1. Create controllers for data acess
    2. Make endpoints pure
*/