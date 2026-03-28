import type { ClientFormData } from '../types/types';

export function normalizeCepDigits(zip: string | undefined | null): string {
	return (zip ?? '').replace(/\D/g, '');
}

const t = (s: string | undefined) => (s ?? '').trim();

/** True if any of CEP, logradouro, número, cidade ou UF has a value — then all five are required. */
export function isAddressCorePartiallyFilled(
	a: ClientFormData['address'] | undefined
): boolean {
	if (!a) return false;
	if (normalizeCepDigits(a.zipcode).length > 0) return true;
	return (
		t(a.streetName) !== '' ||
		t(a.number) !== '' ||
		t(a.city) !== '' ||
		t(a.state) !== ''
	);
}

/** True if there is any address data to send (including bairro/complemento alone). */
export function isAnyAddressFieldFilled(
	a: ClientFormData['address'] | undefined
): boolean {
	if (!a) return false;
	if (isAddressCorePartiallyFilled(a)) return true;
	return t(a.district) !== '' || t(a.addressAdditionalDetails) !== '';
}
