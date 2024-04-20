'use client';

import BasePageHeader from '@/components/layout/BasePageHeader';
import { Paper, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import { ClientTable } from '@/components/table/client/ClientTable';

export default function Page() {
	return (
		<Paper sx={{ padding: 5 }}>
			<BasePageHeader title="Clientes" />
			<Container maxWidth="lg"></Container>
			<ClientTable />
		</Paper>
	);
}
