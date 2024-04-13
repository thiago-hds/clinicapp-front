import dayjs from 'dayjs';

export function formatDate(date?: Date) {
	if (!date) {
		return '';
	}
	return dayjs(date).format('DD/MM/YYYY');
}
