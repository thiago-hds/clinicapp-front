'use client';

import BasePageHeader from '@/components/layout/BasePageHeader';
import { Paper } from '@mui/material';
import { ClientForm } from './components/forms/ClientForm';

export default function ClientCreatePage() {
	return (
		<Paper sx={{ padding: 5 }}>
			<BasePageHeader title="Novo Cliente" />
			<ClientForm client={null} />
		</Paper>
	);
}
