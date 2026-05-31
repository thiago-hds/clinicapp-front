'use client';

import BasePageHeader from '@/components/layout/BasePageHeader';
import { Paper } from '@mui/material';
import { UserForm } from './components/forms/UserForm';

export default function UserCreatePage() {
	return (
		<Paper sx={{ padding: 5 }}>
			<BasePageHeader title="Novo Usuário" />
			<UserForm user={null} />
		</Paper>
	);
}
