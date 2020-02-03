import moment from "moment";

export function formatAvailabilityDateTime(timestamp: string): string {
    return moment(timestamp).format("MM/DD/YYYY h:mm a");
}