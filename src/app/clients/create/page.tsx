'use client';

import BasePageHeader from '@/components/layout/BasePageHeader';

import { Paper } from '@mui/material';

import { useRouter } from 'next/navigation';

import { ClientForm } from '@/components/forms/ClientForm';

export default function Page() {
	const router = useRouter();

	return (
		<Paper sx={{ padding: 5 }}>
			<BasePageHeader title="Novo Cliente" />
			<ClientForm client={null} />
		</Paper>
	);
}
