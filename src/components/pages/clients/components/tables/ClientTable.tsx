import {
	TableCell,
	Button,
	Stack,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
} from '@mui/material';
import { useState } from 'react';
import {
	CustomTable,
	CustomTableHeadCell,
} from '@/components/table/CustomTable';
import { formatDurationUntilNow } from '@/util/formatter';
import NextLink from 'next/link';
import dayjs from 'dayjs';
import { useClientActions } from '../../hooks/useClientActions';

interface ClientTableProps {
	clients: Client[];
	paginationInfo: PaginationInfo | null;
	paginationControls: PaginationControls;
	onPaginationControlsChange: (
		paginationControls: Partial<PaginationControls>
	) => void;
	sortControls: SortControls;
	onSortChange: (property: string, order: Order) => void;
	onUserDeleted: () => void;
}

export const ClientTable: React.FC<ClientTableProps> = ({
	clients,
	paginationInfo,
	paginationControls,
	onPaginationControlsChange,
	sortControls,
	onSortChange,
	onUserDeleted,
}) => {
	const { deleteClient } = useClientActions();
	const [isDeleteConfirmDialogOpen, setIsDeleteConfirmDialogOpen] =
		useState(false);
	const [selectedClientId, setSelectedClientId] = useState<number | null>(
		null
	);

	const handleChangePage = (newPage: number) => {
		onPaginationControlsChange({ page: newPage });
	};

	const handleChangeRowsPerPage = (rowsPerPage: number) => {
		onPaginationControlsChange({ page: 0, rowsPerPage: rowsPerPage });
	};

	const handleDeleteClientClick = (id: number) => {
		setSelectedClientId(id);
		setIsDeleteConfirmDialogOpen(true);
	};

	const handleDeleteConfirmDialogClose = () => {
		setIsDeleteConfirmDialogOpen(false);
	};

	const handleDeleteClientConfirm = async () => {
		if (!selectedClientId) return;
		await deleteClient(selectedClientId);
		setSelectedClientId(null);
		setIsDeleteConfirmDialogOpen(false);
		onUserDeleted();
	};

	const headCells: CustomTableHeadCell<Client>[] = [
		{
			id: 'createdAt',
			numeric: false,
			disablePadding: true,
			label: 'Cadastrado Em',
			renderCell: (row: Client) =>
				dayjs(row.createdAt).format('DD/MM/YYYY HH:mm'),
		},
		{
			id: 'firstName',
			numeric: false,
			disablePadding: true,
			label: 'Nome',
			renderCell: (row: Client) => `${row.firstName} ${row.lastName}`,
		},
		{
			id: 'cpf',
			numeric: false,
			disablePadding: false,
			label: 'CPF',
		},
		{
			id: 'dateOfBirth',
			numeric: true,
			disablePadding: false,
			label: 'Data de Nascimento',
			renderCell: (row: Client) =>
				row?.dateOfBirth
					? `${dayjs(row.dateOfBirth).format(
							'DD/MM/YYYY'
					  )} (${formatDurationUntilNow(new Date(row.dateOfBirth))})`
					: '',
		},
		{
			id: 'mobilePhone',
			numeric: true,
			disablePadding: false,
			label: 'Telefone Celular',
			disableSort: true,
		},
		{
			id: 'landlinePhone',
			numeric: true,
			disablePadding: false,
			label: 'Telefone Fixo',
			disableSort: true,
		},
		{
			id: 'actions',
			numeric: false,
			disablePadding: false,
			label: '',
			renderCell: (row: Client) => (
				<Stack direction="row" spacing={1}>
					<Button
						href={`/dashboard/clients/edit/${row.id}`}
						LinkComponent={NextLink}
					>
						Editar
					</Button>
					<Button
						color="error"
						onClick={() => handleDeleteClientClick(row.id)}
					>
						Excluir
					</Button>
				</Stack>
			),
		},
	];

	return (
		<>
			<CustomTable
				headCells={headCells}
				rows={clients}
				paginationInfo={paginationInfo}
				rowsPerPage={paginationControls.rowsPerPage}
				handleChangePage={handleChangePage}
				handleChangeRowsPerPage={handleChangeRowsPerPage}
				onSortChange={onSortChange}
				order={sortControls.order}
				orderBy={sortControls.orderBy}
			/>
			<Dialog
				open={isDeleteConfirmDialogOpen}
				onClose={handleDeleteConfirmDialogClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle>{'Excluir cliente'}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Tem certeza que deseja excluir o cliente? Esta ação é
						irreversível
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDeleteConfirmDialogClose}>
						Cancelar
					</Button>
					<Button
						color="error"
						onClick={handleDeleteClientConfirm}
						autoFocus
					>
						Confirmar Exclusão
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
