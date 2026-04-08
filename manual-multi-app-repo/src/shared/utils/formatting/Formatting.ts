import { DateTime } from "luxon";

export const dateStringFromDate = (date: DateTime, options?: Intl.DateTimeFormatOptions): string => {
    return date.setLocale("en-US").toLocaleString(options || DateTime.DATE_FULL);
};

export const formatNumber = (value: number) => {
    if (Number.isNaN(value)) return `${value}`;
  
    return new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }).format(value);
};
  