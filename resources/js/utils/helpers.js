import { DateTime } from "luxon";

export const dateforHumans = (date) => {
    const formatted = DateTime.fromISO(date)
        .setLocale("es")
        .toLocaleString(DateTime.DATE_FULL);
    return formatted;
};
