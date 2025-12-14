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
		createdAt: string;
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

	interface PaginationInfo {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
		hasPreviousPage: boolean;
		hasNextPage: boolean;
	}

	interface PaginationControls {
		page: number;
		rowsPerPage: number;
	}

	interface SortControls {
		orderBy: string;
		order: Order;
	}

	type Order = 'asc' | 'desc';
}
