import { writable } from "svelte/store";
import type { ConnectionGroup } from "./models/connection";
import type { StationGroup } from "./models/station";

export const stations = createStation();

export const showConnections = writable(false);
export const loadingConnections = writable(false);
export const connections = createConnection();


function createStation() {
        const { subscribe, set } = writable<StationGroup>({} as StationGroup);

        return {
                subscribe,
                get: (lang: string) => {
                        api<StationGroup>(`https://api.irail.be/stations/?format=json&lang=${lang}`)
                                .then(data => set(data))
                                .catch(data => set({} as StationGroup));
                }
        };
}


function createConnection() {
        const { subscribe, set } = writable<ConnectionGroup>({} as ConnectionGroup);

        return {
                subscribe,
                get: (from: string, to: string, date: Date, time: string, timesel: string) => {
                        loadingConnections.set(true);

                        //date format: DDMMYY
                        const shortDate: string = `${date.getDate().toString().padStart(2, '0')}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getFullYear().toString().slice(2, 4)}`;

                        api<ConnectionGroup>(`https://api.irail.be/connections/?from=${from}&to=${to}&date=${shortDate}&time=${time}&timesel=${timesel}&format=json&lang=fr`)
                                .then(data => set(data as ConnectionGroup))
                                .catch(data => set({} as ConnectionGroup))
                                .finally(() => {
                                        showConnections.set(true);
                                        loadingConnections.set(false);;
                                });

                }
        };
}


async function api<T>(url: string): Promise<T> {
        const response = await fetch(url);

        const data = await response.json() as Promise<T>;

        return data;
}