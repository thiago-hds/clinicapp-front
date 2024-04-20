export {};

declare global {
	interface Client {
		id: number;
		firstName: string;
		lastName: string;
		cpf: string;
		rg: string;
		dateOfBirth?: string;
		dateOfFirstVisit: string;
		notes: string;
		occupation: string;
		email: string;
		landlinePhone: string;
		mobilePhone: string;
		howTheyFoundUs: string;
		address: Address;
	}

	interface Address {
		id: number;
		zipcode: string;
		streetName: string;
		district: string;
		city: string;
		state: string;
		number: number;
		additionalDetails: string;
	}

	interface Pagination {
		page: number;
		take: number;
		itemCount: number;
		pageCount: number;
		hasPreviousPage: boolean;
		hasNextPage: boolean;
	}
}
