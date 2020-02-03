export type Booking = {
    studentName: string,
    advisorId: number,
    dateTime: string,
}

export async function fetchBookings(): Promise<Booking[]> {
    try {
        const res = await fetch("http://localhost:4433/booking");
        const json: Booking[] = await res.json();
        return json;
    } catch(e) {
        console.error("Failed to fetch availability", e);
        return [];
    }
}

export async function createBooking(booking: Booking): Promise<void> {
    try {
        await fetch("http://localhost:4433/booking", {
            method: 'post',
            body: JSON.stringify(booking),
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch(e) {
        console.error("Failed to fetch availability", e);
    }
}