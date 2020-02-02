const formatAvailabilities = require ("./availability").formatAvailabilities;

describe('formatAvailabilities', () => {
    var mockData = {
        "2019-04-04": {                          // Data is grouped by day
            "2019-04-04T13:00:00-04:00": 372955, // Keys represent availability date/time
            "2019-04-04T11:30:00-04:00": 399956, // Values represent the ID of the available advisor
            "2019-04-04T11:00:00-04:00": 372955
        },
        "2019-04-05": {
            "2019-04-05T11:30:00-04:00": 417239, 
            "2019-04-05T16:00:00-04:00": 417239, 
            "2019-04-05T18:00:00-04:00": 417239
        }
    };

    it('Should group and sort availabilities by advisor, and then sort groupings by advisorId', () => {
        var availabilityByAdvisor = formatAvailabilities(mockData);

        expect(availabilityByAdvisor).toEqual([
            {advisorId: 372955, dateTime: "2019-04-04T11:00:00-04:00"},
            {advisorId: 372955, dateTime: "2019-04-04T13:00:00-04:00"},
            {advisorId: 399956, dateTime: "2019-04-04T11:30:00-04:00"},
            {advisorId: 417239, dateTime: "2019-04-05T11:30:00-04:00"},
            {advisorId: 417239, dateTime: "2019-04-05T16:00:00-04:00"},
            {advisorId: 417239, dateTime: "2019-04-05T18:00:00-04:00"}
        ]);
    })
});