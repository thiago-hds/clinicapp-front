import { DateValidationError } from '@mui/x-date-pickers';

export function getDatePickerValidationErrorMessage(
	error: DateValidationError
) {
	console.log(error, 'error');
	switch (error) {
		case 'disableFuture':
			return 'Selecione uma data passada';

		case 'disablePast':
			return 'Selecione uma data futura';

		default: {
			return '';
		}
	}
}
