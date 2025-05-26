import * as THREE from 'three';

/**
 * Formats a number with options for currency, decimal places, and separators.
 *
 * @param value - The number to format.
 * @param options - Optional formatting options, compatible with `Intl.NumberFormatOptions`.
 * @returns The formatted number as a string. Returns 'Invalid Number' if formatting fails.
 * @example
 * formatNumber(1234.56, { style: 'currency', currency: 'USD' }); // Output: $1,234.56
 * formatNumber(9876.543, { minimumFractionDigits: 3 }); // Output: 9,876.543
 */
export const formatNumber = (value: number, options?: Intl.NumberFormatOptions): string => {
  try {
    const formatter = new Intl.NumberFormat(undefined, options);
    return formatter.format(value);
  } catch (error) {
    console.error('Error formatting number:', error);
    return 'Invalid Number';
  }
};

/**
 * Truncates a string to a specified length, adding an optional ellipsis.
 *
 * @param text - The string to truncate.
 * @param maxLength - The maximum length of the truncated string.
 * @param options - Optional parameters: ellipsis - the characters to append if truncated.
 * @returns The truncated string, with ellipsis if the original string was longer than maxLength. Returns an empty string if maxLength is zero or negative.
 * @example
 * truncateString("This is a long string", 10); // Output: "This is a l..."
 * truncateString("Short string", 20); // Output: "Short string"
 */
export const truncateString = (text: string, maxLength: number, options: { ellipsis?: string } = {}): string => {
    const { ellipsis = '...' } = options;

    if (typeof maxLength !== 'number') {
        console.error('maxLength must be a number');
        return text;
    }

    if (maxLength <= 0) {
        return '';
    }

    if (text.length <= maxLength) {
        return text;
    }

    return text.substring(0, maxLength) + ellipsis;
};

/**
 * Capitalizes the first letter of a string.
 *
 * @param text - The string to capitalize.
 * @returns The capitalized string.
 * @example
 * capitalizeString("hello world"); // Output: "Hello world"
 */
export const capitalizeString = (text: string): string => {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Formats a date or timestamp with specified options.
 *
 * @param date - The date or timestamp to format.
 * @param options - Optional formatting options, compatible with `Intl.DateTimeFormatOptions`.
 * @returns The formatted date string. Returns 'Invalid Date' if formatting fails.
 * @example
 * formatDate(new Date(), { year: 'numeric', month: 'long', day: 'numeric' }); // Output: e.g., "July 20, 2024"
 * formatDate(1658396400000, { dateStyle: 'short', timeStyle: 'short' }); // Output: e.g., "7/21/2022, 12:00 AM"
 */
export const formatDate = (date: Date | number, options?: Intl.DateTimeFormatOptions): string => {
  try {
    const formatter = new Intl.DateTimeFormat(undefined, options);
    return formatter.format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
};

/**
 * Formats the time difference relative to the current time.
 *
 * @param date - The date or timestamp to format.
 * @returns A string representing the relative time (e.g., "2 hours ago", "in 5 minutes"). Returns 'Invalid Date' if formatting fails.
 * @example
 * formatRelativeTime(Date.now() - 7200000); // Output: "2 hours ago"
 * formatRelativeTime(Date.now() + 300000); // Output: "in 5 minutes"
 */
export const formatRelativeTime = (date: Date | number): string => {
    try {
        const value = typeof date === 'number' ? date : date.getTime();
        const diff = value - Date.now();

        const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

        const minute = 60000;
        const hour = 3600000;
        const day = 86400000;
        const week = 604800000;

        if (Math.abs(diff) < minute) {
            return rtf.format(-Math.round(diff / 1000), 'second');
        } else if (Math.abs(diff) < hour) {
            return rtf.format(-Math.round(diff / minute), 'minute');
        } else if (Math.abs(diff) < day) {
            return rtf.format(-Math.round(diff / hour), 'hour');
        } else if (Math.abs(diff) < week) {
            return rtf.format(-Math.round(diff / day), 'day');
        } else {
            const formatter = new Intl.DateTimeFormat('en', {year: 'numeric', month: 'long', day: 'numeric'});
            const formattedDate = formatter.format(date);
            return formattedDate
        }
    } catch (error) {
        console.error('Error formatting relative time:', error);
        return 'Invalid Date';
    }
};

/**
 * Converts a THREE.Color to a hexadecimal color string.
 *
 * @param color - The THREE.Color to convert.
 * @returns The hexadecimal color string (e.g., "#ffffff").
 */
export const formatHexColor = (color: THREE.Color): string => {
  try {
    return `#${color.getHexString()}`;
  } catch (error) {
    console.error('Error formatting hex color:', error);
    return '#000000';
  }
};