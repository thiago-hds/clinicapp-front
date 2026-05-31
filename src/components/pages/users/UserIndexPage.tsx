'use client';

import BasePageHeader from '@/components/layout/BasePageHeader';
import { Paper, Button, Stack, TextField, InputAdornment } from '@mui/material';
import { Search, Add } from '@mui/icons-material';
import NextLink from 'next/link';
import { useState, useEffect } from 'react';
import { CustomTable, Column } from '@/components/table/CustomTable';
import { axiosInstance } from '@/util/api';

export default function UserIndexPage() {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState('');

	useEffect(() => {
		fetchUsers();
	}, []);

	async function fetchUsers() {
		setLoading(true);
		try {
			const response = await axiosInstance.get('/users');
			setUsers(response.data);
		} catch (error) {
			console.error('Erro ao buscar usuários:', error);
		} finally {
			setLoading(false);
		}
	}

	const columns: Column[] = [
		{ id: 'firstName', label: 'Nome' },
		{ id: 'lastName', label: 'Sobrenome' },
		{ id: 'email', label: 'E-mail' },
	];

	return (
		<Paper sx={{ padding: 5 }}>
			<BasePageHeader title="Usuários" />
			<Stack direction="row" spacing={2} sx={{ mb: 3 }} justifyContent="space-between">
				<TextField
					placeholder="Buscar usuários..."
					value={search}
					onChange={e => setSearch(e.target.value)}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<Search />
							</InputAdornment>
						),
					}}
				/>
				<Button
					variant="contained"
					startIcon={<Add />}
					href="/dashboard/users/create"
					LinkComponent={NextLink}
				>
					Novo Usuário
				</Button>
			</Stack>
			<CustomTable
				columns={columns}
				rows={users.filter(u => 
					u.firstName.toLowerCase().includes(search.toLowerCase()) ||
					u.lastName.toLowerCase().includes(search.toLowerCase()) ||
					u.email.toLowerCase().includes(search.toLowerCase())
				)}
				isLoading={loading}
				onEdit={id => window.location.href = `/dashboard/users/edit/${id}`}
			/>
		</Paper>
	);
}
