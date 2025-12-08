'use client';

import { Paper, Button, Grid, Typography } from '@mui/material';

import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/util/fetcher';
import NextLink from 'next/link';
import { ClientFilterForm } from './components/forms/ClientFilterForm';
import { ClientTable } from './components/tables/ClientTable';

export default function ClientIndexPage() {
	const [paginationControls, setPaginationControls] =
		useState<PaginationControls>({ page: 0, rowsPerPage: 10 });
	const [query, setQuery] = useState<string>('');
	const [clientsParams, setClientsParams] = useState({
		query: '',
		page: 1,
		take: 10,
	});

	const { data, error, isLoading } = useSWR(
		['/clients', clientsParams],
		([url, params]) => fetcher(url, params)
	);
	const clients: Client[] = data?.items ?? [];
	const paginationInfo: PaginationInfo | null = data?.meta ?? null;

	useEffect(
		function () {
			setClientsParams(params => {
				return {
					...params,
					page: paginationControls.page + 1,
					take: paginationControls.rowsPerPage,
				};
			});
		},
		[paginationControls.page, paginationControls.rowsPerPage]
	);

	function handlePaginationControlsChange(
		newControls: Partial<PaginationControls>
	) {
		setPaginationControls(controls => {
			return { ...controls, ...newControls };
		});
	}

	return (
		<Paper sx={{ padding: 5 }}>
			<Grid
				container
				alignItems="center"
				spacing={1}
				sx={{ marginBottom: 5, padding: 1 }}
			>
				<Grid item xs>
					<Typography variant="h2" sx={{ marginTop: 0.75 }}>
						Clientes
					</Typography>
				</Grid>
				<Grid item xs="auto">
					<Button
						color="success"
						href={`/dashboard/clients/create`}
						LinkComponent={NextLink}
					>
						Novo Cliente
					</Button>
				</Grid>
			</Grid>
			<ClientFilterForm
				query={query}
				onQueryChange={value => setQuery(value)}
				onSearchClick={() => {
					setClientsParams({
						page: paginationControls.page + 1,
						take: paginationControls.rowsPerPage,
						query,
					});
				}}
			/>
			<ClientTable
				clients={clients}
				paginationInfo={paginationInfo}
				paginationControls={paginationControls}
				onPaginationControlsChange={handlePaginationControlsChange}
			/>
		</Paper>
	);
}
