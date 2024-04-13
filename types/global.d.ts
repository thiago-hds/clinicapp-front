export {};

declare global {
	interface Client {
		id: number;
		name: string;
		cpf: string;
		rg: string;
		dateOfBirth?: Date;
		dateOfFirstVisit: string;
		notes: string;
		occupation: string;
		email: string;
		landlinePhone: string;
		mobilePhone: string;
		createdAt: string;
		updatedAt: string;
		deletedAt: string;
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
