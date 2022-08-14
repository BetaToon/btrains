
import { _ } from 'svelte-i18n';

export function toIsoString(date: Date) {
    var tzo = -date.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function (num: number) {
            return (num < 10 ? '0' : '') + num;
        };

    return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate()) +
        'T' + pad(date.getHours()) +
        ':' + pad(date.getMinutes()) +
        ':' + pad(date.getSeconds()) +
        dif + pad(Math.floor(Math.abs(tzo) / 60)) +
        ':' + pad(Math.abs(tzo) % 60);
}

export function getDuration(seconds: number): string {
    const totalMinutes: number = seconds / 60;

    const hours: number = Math.floor(totalMinutes / 60);
    const minutes: number = totalMinutes % 60;

    if (hours == 0) {
        return `${minutes}min`;
    }
    else if (minutes == 0) {
        return `${hours}h`;
    }

    return `${hours}h ${minutes}min`;

}