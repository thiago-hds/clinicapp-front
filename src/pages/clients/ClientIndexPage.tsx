'use client';

import BasePageHeader from '@/components/layout/BasePageHeader';
import {
	Paper,
	Container,
	Box,
	TextField,
	Button,
	Grid,
	Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import useSWR, { mutate } from 'swr';
import { fetcher } from '@/util/fetcher';
import NextLink from 'next/link';
import { axiosInstance } from '@/util/api';
import { ClientFilterForm } from './components/forms/ClientFilterForm';
import { ClientTable } from './components/tables/ClientTable';

export default function ClientIndexPage() {
	// const [clients, setClients] = useState<Client[]>([]);
	// const [paginationInfo, setPaginationInfo] = useState<PaginationInfo | null>(
	// 	null
	// );
	// const [isLoading, setIsLoading] = useState<boolean>(false);

	const [page, setPage] = useState<number>(0);
	const [rowsPerPage, setRowsPerPage] = useState<number>(10);
	const [paginationControls, setPaginationControls] =
		useState<PaginationControls>({ page: 0, rowsPerPage: 10 });
	const [query, setQuery] = useState<string>('');
	const [clientsParams, setClientsParams] = useState({
		query: '',
		page: 1,
		rowsPerPage: 10,
	});

	// useEffect(() => {
	// 	fetchClients();
	// }, []);

	const { data, error, isLoading } = useSWR(
		['/clients', clientsParams],
		([url, params]) => fetcher(url, params)
	);
	const clients: Client[] = data?.data ?? [];
	const paginationInfo: PaginationInfo | null = data?.meta ?? null;

	// console.log('clients', clients);

	// async function fetchClients() {
	// 	try {
	// 		setIsLoading(true);
	// 		const response = await axiosInstance.get('/clients', {
	// 			params: { query: query },
	// 		});
	// 		console.log('response', response.data);

	// 		setClients(response.data.data);
	// 		setPaginationInfo(response.data.meta);
	// 	} catch (err) {
	// 		if (err instanceof AxiosError) {
	// 			console.error(err?.response?.data);
	// 		} else {
	// 			console.error(err);
	// 		}
	// 	} finally {
	// 		setIsLoading(false);
	// 	}
	// }

	function handlePaginationControlsChange(
		newControls: Partial<PaginationControls>
	) {
		setPaginationControls(controls => {
			return { ...controls, newControls };
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
				{/* <Breadcrumbs aria-label="breadcrumb">
				<Link underline="hover" color="inherit" href="/">
					Clientes
				</Link>
				<Link
					underline="hover"
					color="inherit"
					href="/material-ui/getting-started/installation/"
				>
					Core
				</Link>
				<Typography color="text.primary">Listar</Typography>
			</Breadcrumbs> */}
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
						...paginationControls,
						page: paginationControls.page + 1,
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
