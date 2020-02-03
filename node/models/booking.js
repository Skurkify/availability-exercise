// in memory bookings
let bookings = [];

module.exports.clearBookings = function clearBookings() {
    bookings = []
}

module.exports.getBookings = function getBookings() {
    return bookings;
}

module.exports.createBooking = function createBooking(booking) {
    if(!booking.studentName || !booking.advisorId || !booking.dateTime) {
        throw new Error("studentName, advisorId, and dateTime are required to create a booking");
    }

    const existingBooking = bookings.find(b => b.advisorId === booking.advisorId && b.dateTime === booking.dateTime);
    if(existingBooking) {
        throw new Error("This availability is already booked.");
    }

    bookings.push(booking);
}