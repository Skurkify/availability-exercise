import { Availability } from "../services/availability";
import sortBy from "lodash.sortby";
import groupBy from "lodash.groupby";
import map from "lodash.map";

export type AdvisorAvailability = {
    advisorId: number,
    availabilities: Availability[],
}

/*
    I decided to handle display level grouping on the client.
    I could see this being hoisted to the server as well depending on team standards
*/
export function formatAvailabilitiesByAdvisor(availabilities: Availability[]): AdvisorAvailability[] {
    const availabilityByAdvisor = groupBy(availabilities, availability => availability.advisorId);
    const advisorAvailabilities = map(availabilityByAdvisor, (availabilities, advisorId) => ({advisorId: Number(advisorId), availabilities}));
    const sortedAdvisorAvailabilities = sortBy(advisorAvailabilities, advisorAvailability => advisorAvailability.advisorId);
    return sortedAdvisorAvailabilities;
}