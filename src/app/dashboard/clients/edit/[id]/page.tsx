import BasePageHeader from '@/components/layout/BasePageHeader';
import { Paper } from '@mui/material';
import { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { axiosInstance } from '@/util/api';
import { FC } from 'react';
import { ClientForm } from '@/components/pages/clients/components/forms/ClientForm';

interface ClientEditPageParams {
	params: { id: number };
}

const ClientEditPage: FC<ClientEditPageParams> = async ({ params }) => {
	const client = await getClient(params.id);

	return (
		<Paper>
			<BasePageHeader title="Editar Cliente" />
			<ClientForm isLoading={false} client={client} />
		</Paper>
	);
};

export default ClientEditPage;

async function getClient(id: number): Promise<Client | null> {
	const cookieStore = cookies();
	const accessToken = cookieStore.get('accessToken')?.value ?? '';
	console.log('accessToken', accessToken);
	try {
		const response = await axiosInstance.get(`/clients/${id}`, {
			headers: {
				Cookie: `accessToken=${accessToken};`,
			},
		});
		return response.data?.data as Client;
	} catch (err) {
		if (err instanceof AxiosError) {
			console.error(err?.response?.data);
		} else {
			console.error(err);
		}
	}
	return null;
}
