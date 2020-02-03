// in memory bookings
const bookings = [];

module.exports.getBookings = function getBookings() {
    return bookings;
}

module.exports.createBooking = function createBooking(booking) {
    if(!booking.studentName || !booking.advisorId || !booking.dateTime) {
        throw new Error("name, advisorId, and dateTime are required to create a booking");
    }

    bookings.push(booking);
}