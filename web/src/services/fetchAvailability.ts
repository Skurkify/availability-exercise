export type Availability = {
    advisorId: number,
    dateTime: string,
}

export async function fetchAvailability(): Promise<Availability[]> {
    try {
        const res = await fetch("http://localhost:4433/availability");
        const json: Availability[] = await res.json();
        return json;
    } catch(e) {
        console.error("Failed to fetch availability", e);
        return [];
    }
}