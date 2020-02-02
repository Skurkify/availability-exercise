import { formatAvailabilitiesByAdvisor } from "./availability";

describe('formatAvailabilitiesByAdvisor', () => {
    var mockData = [
        {advisorId: 372955, dateTime: "2019-04-04T11:00:00-04:00"},
        {advisorId: 372955, dateTime: "2019-04-04T13:00:00-04:00"},
        {advisorId: 399956, dateTime: "2019-04-04T11:30:00-04:00"},
        {advisorId: 417239, dateTime: "2019-04-05T11:30:00-04:00"},
        {advisorId: 417239, dateTime: "2019-04-05T16:00:00-04:00"},
        {advisorId: 417239, dateTime: "2019-04-05T18:00:00-04:00"}
    ]

    it('Should group and sort availabilities by advisor, and then sort groupings by advisorId', () => {
        var availabilityByAdvisor = formatAvailabilitiesByAdvisor(mockData);

        expect(availabilityByAdvisor).toEqual([
            {
                advisorId: 372955,
                availabilities: [
                    {advisorId: 372955, dateTime: "2019-04-04T11:00:00-04:00"},
                    {advisorId: 372955, dateTime: "2019-04-04T13:00:00-04:00"},
                ]
            },
            {
                advisorId: 399956,
                availabilities: [
                    {advisorId: 399956, dateTime: "2019-04-04T11:30:00-04:00"},
                ]
            },
            {
                advisorId: 417239,
                availabilities: [
                    {advisorId: 417239, dateTime: "2019-04-05T11:30:00-04:00"},
                    {advisorId: 417239, dateTime: "2019-04-05T16:00:00-04:00"},
                    {advisorId: 417239, dateTime: "2019-04-05T18:00:00-04:00"}
                ]
            },
        ]);
    })
});