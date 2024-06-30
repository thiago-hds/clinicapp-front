import { TableCell, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import {
	CustomTable,
	CustomTableHeadCell,
} from '@/components/table/CustomTable';
import { formatDate, formatDurationUntilNow } from '@/util/formatter';
import NextLink from 'next/link';

interface ClientTableProps {
	clients: Client[];
	paginationInfo: PaginationInfo | null;
	paginationControls: PaginationControls;
	onPaginationControlsChange: (
		paginationControls: Partial<PaginationControls>
	) => void;
}

export const ClientTable: React.FC<ClientTableProps> = ({
	clients,
	paginationInfo,
	paginationControls,
	onPaginationControlsChange,
}) => {
	const handleChangePage = (newPage: number) => {
		// setPage(newPage);
		onPaginationControlsChange({ page: newPage });
	};

	const handleChangeRowsPerPage = (rowsPerPage: number) => {
		onPaginationControlsChange({ page: 0, rowsPerPage: rowsPerPage });
		// setRowsPerPage(rowsPerPage);
		// setPage(0);
	};

	return (
		<CustomTable
			headCells={headCells}
			rows={clients}
			paginationInfo={paginationInfo}
			page={paginationInfo?.page ?? 0}
			rowsPerPage={paginationControls.rowsPerPage}
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
							{row?.dateOfBirth
								? `${formatDate(
										new Date(row.dateOfBirth)
								  )} (${formatDurationUntilNow(
										new Date(row.dateOfBirth)
								  )})`
								: ''}
						</TableCell>
						<TableCell align="right">{row.mobilePhone}</TableCell>
						<TableCell align="right">{row.landlinePhone}</TableCell>
						<TableCell align="right">
							<Button
								variant="contained"
								href={`/dashboard/clients/edit/${row.id}`}
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
};

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
