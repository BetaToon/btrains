export interface ConnectionGroup {
    connection: Connection[];
}

interface Connection {
    alerts: Alert[];
    arrival: Arrival;
    departure: Departure;
    duration: string;
    vias: ViaGroup;
}

interface Alert {
    lead: string;
}

interface Arrival {
    delay: number;
    station: string;
    time: string;
    platform: string;
}

interface Departure {
    delay: number;
    station: string;
    time: string;
    platform: string;
}

interface ViaGroup {
    number: string;
}