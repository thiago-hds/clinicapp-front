import dayjs from 'dayjs';

export function formatDate(date?: Date): string {
	if (!date) {
		return '';
	}
	return dayjs(date).format('DD/MM/YYYY');
}

export function formatDurationUntilNow(date?: Date): string {
	if (!date) {
		return '';
	}

	const durationPlugin = require('dayjs/plugin/duration');
	dayjs.extend(durationPlugin);

	const from = dayjs(date);
	const now = dayjs();

	const duration = dayjs.duration(now.diff(from));

	return duration.format('YY [anos,] MM [meses]');

	let formattedDuration = '';

	console.log('duration', duration);
	return 'ok';
}
