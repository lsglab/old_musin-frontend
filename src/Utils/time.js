/* eslint-disable no-param-reassign */
export function getTimeDifference(time) {
	const date = new Date(time);

	const seconds = (new Date().getTime() - date.getTime()) / 1000;

	const second = 1;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;
	const week = day * 7;
	const month = day * 30;
	const year = day * 365;

	function buildString(unit, string) {
		const difference = Math.round(seconds / unit);
		if (difference > 1) {
			if (string.charAt(string.length - 1) === 'e') {
				string = `${string}n`;
			} else {
				string = `${string}en`;
			}
		}
		return `vor ${difference} ${string}`;
	}

	if (seconds < minute) return buildString(second, 'Sekunde');
	if (seconds >= minute && seconds < hour) return buildString(minute, 'Minute');
	if (seconds >= hour && seconds < day) return buildString(hour, 'Stunde');
	if (seconds >= day && seconds < week) return buildString(day, 'Tag');
	if (seconds >= week && seconds < month) return buildString(week, 'Woche');
	if (seconds >= month && seconds < year) return buildString(month, 'Monat');
	if (seconds >= year) return buildString(year, 'Jahr');
	return undefined;
}

export function toLocalDateString(time, options = {}, lang) {
	const date = new Date(time);

	return date.toLocaleDateString(lang, options);
}

export function formatMMDDYYYY(date, seperator = '.') {
	const month = date.getMonth() + 1;
	return date.getDate() + seperator + month + seperator + date.getFullYear();
}
