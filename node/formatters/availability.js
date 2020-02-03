const forEach = require('lodash.foreach');
const sortBy = require('lodash.sortby');

/*
    I decided to format the availabilities into a flat array of objects.
    I did this for a few reasons.
    1. It makes it easier for the server and client to operate on data like this
    2. formatting and returning objects allows us to grow the contract without breaking it.
    3. In a fully JS environment, formatting can be easily moved around during code review.
*/
module.exports.formatAvailabilities = function formatAvailabilities(availabilitiesByDay) {
    const bookings = [];

    forEach(availabilitiesByDay, (availabilityByDay) => {
        forEach(availabilityByDay, (advisorId, dateTime) => {
            bookings.push({advisorId, dateTime});
        })
    });

    const sortedAvailabilities = sortBy(bookings,
        booking => booking.advisorId,
        booking => booking.dateTime
    )

    return sortedAvailabilities;
}