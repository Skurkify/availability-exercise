import { formatAvailabilityDateTime } from "./dates";

describe("formatAvailabilityDateTime", () => {
    it("should format time stamp to month/date/year hours/minutes meridiem", () => {
        const timestamp = "2019-08-22T03:00:00-04:00";
        const result = formatAvailabilityDateTime(timestamp);
        expect(result).toBe("08/22/2019 2:00 am");
    })
})