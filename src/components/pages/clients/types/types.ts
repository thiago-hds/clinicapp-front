import { Dayjs } from 'dayjs';

export type ClientFormData = {
	firstName: string;
	lastName: string;
	cpf: string;
	rg: string;
	dateOfBirth?: Dayjs;
	dateOfFirstVisit: string;
	landlinePhone: string;
	mobilePhone: string;
	email: string;
	occupation: string;
	notes: string;
	address: {
		zipcode: string;
		streetName: string;
		number: string;
		district: string;
		addressAdditionalDetails: string;
		city: string;
		state: string;
	};
	howTheyFoundUs: string;
};
