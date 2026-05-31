import BasePageHeader from '@/components/layout/BasePageHeader';
import { Paper } from '@mui/material';
import { AxiosError } from 'axios';
import { axiosInstance } from '@/util/api';
import { FC } from 'react';
import { UserForm } from '@/components/pages/users/components/forms/UserForm';

interface UserEditPageParams {
	params: { id: number };
}

const UserEditPage: FC<UserEditPageParams> = async props => {
	const params = await props.params;
	const user = await getUser(params.id);

	return (
		<Paper sx={{ padding: 5 }}>
			<BasePageHeader title="Editar Usuário" />
			<UserForm isLoading={false} user={user} />
		</Paper>
	);
};

export default UserEditPage;

async function getUser(id: number): Promise<User | null> {
	try {
		const response = await axiosInstance.get(`/users/${id}`);
		return response?.data as User;
	} catch (err) {
		if (err instanceof AxiosError) {
			console.error(err?.response?.data);
		} else {
			console.error(err);
		}
	}
	return null;
}
