import dayjs from 'dayjs';
import 'dayjs/plugin/duration';

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

	dayjs.extend(require('dayjs/plugin/duration'));

	const from = dayjs(date);
	const now = dayjs();

	const duration = dayjs.duration(now.diff(from));

	return duration.format('YY [anos,] MM [meses]');
}
