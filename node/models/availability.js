const fetch = require('node-fetch');
const formatAvailabilities = require('../formatters/availability').formatAvailabilities;
const bookingModel = require('../models/booking');
const differenceBy = require('lodash.differenceby');

module.exports.getAvailabilities = async function getAvailabilities() {
    const response = await fetch('https://www.thinkful.com/api/advisors/availability')
    const availabilities = await response.json();
    const formattedAvailabilities = formatAvailabilities(availabilities);
    const bookings = bookingModel.getBookings();
    var filteredAvailabilities = differenceBy(formattedAvailabilities, bookings, (item) => {
        return `${item.advisorId}:${item.dateTime}`
    });
    return filteredAvailabilities;
}
