const bookingModel = require('./booking');

describe('Booking Model', () => {
    beforeEach(() => {
        bookingModel.clearBookings();
    });


    it('Should throw exception when the same booking is created twice', () => {
        const mockBooking = {studentName: 'Ryan', advisorId: 1, dateTime: 'some time stamp'}

        try {
            bookingModel.createBooking(mockBooking);
            bookingModel.createBooking(mockBooking);
        } catch(ex) {
            expect(ex.message).toBe("This availability is already booked.");
        }
    });

    it('Should throw exception when required booking data is not required', () => {
        const incompleteBooking = {advisorId: 1, dateTime: 'some time stamp'}

        try {
            bookingModel.createBooking(incompleteBooking);
        } catch(ex) {
            expect(ex.message).toBe("studentName, advisorId, and dateTime are required to create a booking");
        }
    });

    it('A valid booking is saved', () => {
        const validBooking = {studentName: 'Ryan', advisorId: 1, dateTime: 'some time stamp'}

        bookingModel.createBooking(validBooking);
        const bookings = bookingModel.getBookings();
        expect(bookings).toEqual([
            validBooking
        ]);
    });

    // it('Confirm the related availability exists before booking', () => {
       
    // });
});