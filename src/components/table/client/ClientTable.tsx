import { TableCell, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import {
	CustomTable,
	CustomTableHeadCell,
} from '@/components/table/CustomTable';
import { formatDate, formatDurationUntilNow } from '@/util/formatter';
import NextLink from 'next/link';

export function ClientTable() {
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
							{`${row.firstName} ${row.lastName}`}
						</TableCell>
						<TableCell align="right">
							{`${formatDate(
								row.dateOfBirth
							)} (${formatDurationUntilNow(row.dateOfBirth)})`}
						</TableCell>
						<TableCell align="right">{row.mobilePhone}</TableCell>
						<TableCell align="right">{row.landlinePhone}</TableCell>
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
