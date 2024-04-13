'use client';

import CepCustomInput from '@/components/inputs/CepCustomInput';
import CpfCustomInput from '@/components/inputs/CpfCustomInput';
import PhoneCustomInput from '@/components/inputs/PhoneCustomInput';
import BasePageHeader from '@/components/layout/BasePageHeader';
import fetchCep from '@/util/fetchCep';
import { validateCpf } from '@/util/validateDocument';
import {
	Grid,
	TextField,
	Button,
	Stack,
	Paper,
	Container,
	Typography,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	TableCell,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import axios, { Axios, AxiosError } from 'axios';
import { LinkSharp } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CustomTable, {
	CustomTableHeadCell,
} from '@/components/table/CustomTableTable';
import { formatDate } from '@/util/formatter';
import NextLink from 'next/link';

export default function Page() {
	const router = useRouter();

	const [clients, setClients] = useState<Client[]>([]);
	const [paginationData, setPaginationData] = useState<Pagination>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [page, setPage] = useState<number>(0);
	const [rowsPerPage, setRowsPerPage] = useState<number>(10);

	useEffect(() => {
		async function fetchClients() {
			const instance = axios.create({
				baseURL: 'http://localhost:8000',
			});
			try {
				setIsLoading(true);
				const response = await instance.get('/clients');
				console.log('response', response.data);

				setClients(response.data.data);
				setPaginationData(response.data.meta);
			} catch (err) {
				if (err instanceof AxiosError) {
					console.error(err?.response?.data);
				} else {
					console.error(err);
				}
			} finally {
				setIsLoading(false);
			}
		}
		fetchClients();
	}, []);

	const handleChangePage = (newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (rowsPerPage: number) => {
		setRowsPerPage(rowsPerPage);
		setPage(0);
	};

	return (
		<Paper sx={{ padding: 5 }}>
			<BasePageHeader title="Clientes" />
			<Container maxWidth="lg"></Container>

			<CustomTable
				headCells={headCells}
				rows={clients}
				pagination={paginationData}
				page={page}
				rowsPerPage={rowsPerPage}
				handleChangePage={handleChangePage}
				handleChangeRowsPerPage={handleChangeRowsPerPage}
				renderRow={(row, index) => {
					const labelId = `enhanced-table-checkbox-${index}`;
					return (
						<>
							<TableCell
								component="th"
								id={labelId}
								scope="row"
								padding="none"
							>
								{row.name}
							</TableCell>
							<TableCell align="right">
								{formatDate(row.dateOfBirth)}
							</TableCell>
							<TableCell align="right">
								{row.mobilePhone}
							</TableCell>
							<TableCell align="right">
								{row.landlinePhone}
							</TableCell>
							<TableCell align="right">
								<Button
									variant="contained"
									href={`/clients/edit/${row.id}`}
									LinkComponent={NextLink}
								>
									Editar
								</Button>
							</TableCell>
						</>
					);
				}}
			/>
			{/* <Table></Table> */}
			{/* <DataGrid
				rows={clients}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: { page: 0, pageSize: 5 },
					},
				}}
				loading={isLoading}
				pageSizeOptions={[5, 10]}
				checkboxSelection={false}
				disableColumnMenu={true}
			/> */}
		</Paper>
	);
}

const headCells: CustomTableHeadCell[] = [
	{
		id: 'name',
		numeric: false,
		disablePadding: true,
		label: 'Nome',
	},
	{
		id: 'dateOfBirth',
		numeric: true,
		disablePadding: false,
		label: 'Data de Nascimento',
	},
	{
		id: 'mobilePhone',
		numeric: true,
		disablePadding: false,
		label: 'Telefone Celular',
	},
	{
		id: 'landlinePhone',
		numeric: true,
		disablePadding: false,
		label: 'Telefone Fixo',
	},
	{
		id: 'actions',
		numeric: false,
		disablePadding: false,
		label: '',
	},
];
