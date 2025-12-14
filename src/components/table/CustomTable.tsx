import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import {
	Card,
	CardContent,
	Pagination,
	useMediaQuery,
	useTheme,
} from '@mui/material';

interface TableItem {
	id: number;
}

export interface CustomTableHeadCell<T> {
	disablePadding: boolean;
	disableSort?: boolean;
	id: string;
	label: string;
	numeric: boolean;
	renderCell?: (row: T) => React.ReactNode;
}

interface CustomTableHeadProps<T> {
	numSelected: number;
	onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
	headCells: CustomTableHeadCell<T>[];
}

function CustomTableHead<T>(props: CustomTableHeadProps<T>) {
	const {
		onSelectAllClick,
		order,
		orderBy,
		numSelected,
		rowCount,
		onRequestSort,
		headCells,
	} = props;
	const createSortHandler =
		(property: string) => (event: React.MouseEvent<unknown>) => {
			onRequestSort(event, property);
		};

	return (
		<TableHead>
			<TableRow>
				{/* <TableCell padding="checkbox">
					<Checkbox
						color="primary"
						indeterminate={
							numSelected > 0 && numSelected < rowCount
						}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{
							'aria-label': 'select all desserts',
						}}
					/>
				</TableCell> */}
				{headCells.map(headCell => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
							disabled={headCell.disableSort}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component="span" sx={visuallyHidden}>
									{order === 'desc'
										? 'sorted descending'
										: 'sorted ascending'}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

// interface CustomTableToolbarProps {
// 	numSelected: number;
// }

// function CustomTableToolbar(props: CustomTableToolbarProps) {
// 	const { numSelected } = props;

// 	return (
// 		<Toolbar
// 			sx={{
// 				pl: { sm: 2 },
// 				pr: { xs: 1, sm: 1 },
// 				...(numSelected > 0 && {
// 					bgcolor: theme =>
// 						alpha(
// 							theme.palette.primary.main,
// 							theme.palette.action.activatedOpacity
// 						),
// 				}),
// 			}}
// 		>
// 			{numSelected > 0 ? (
// 				<Typography
// 					sx={{ flex: '1 1 100%' }}
// 					color="inherit"
// 					variant="subtitle1"
// 					component="div"
// 				>
// 					{numSelected} selected
// 				</Typography>
// 			) : (
// 				<Typography
// 					sx={{ flex: '1 1 100%' }}
// 					variant="h6"
// 					id="tableTitle"
// 					component="div"
// 				>
// 					Nutrition
// 				</Typography>
// 			)}
// 			{numSelected > 0 ? (
// 				<Tooltip title="Delete">
// 					<IconButton>
// 						<DeleteIcon />
// 					</IconButton>
// 				</Tooltip>
// 			) : (
// 				<Tooltip title="Filter list">
// 					<IconButton>
// 						<FilterListIcon />
// 					</IconButton>
// 				</Tooltip>
// 			)}
// 		</Toolbar>
// 	);
// }

export interface CustomTableProps<T> {
	readonly headCells: CustomTableHeadCell<T>[];
	readonly rows: T[];
	readonly renderRow?: (row: T, index: number) => React.ReactNode;
	readonly paginationInfo: PaginationInfo | null;
	readonly rowsPerPage: number;

	readonly order: Order;
	readonly orderBy: string;
	onSortChange: (property: string, order: Order) => void;

	handleChangePage: (page: number) => void;
	handleChangeRowsPerPage: (rowsPerPage: number) => void;
}

export function CustomTable<T extends TableItem>({
	headCells,
	rows,
	renderRow,
	paginationInfo,
	rowsPerPage,
	handleChangePage,
	onSortChange,
	order,
	orderBy,
	handleChangeRowsPerPage,
}: CustomTableProps<T>) {
	const [selected, setSelected] = React.useState<readonly number[]>([]);
	const [dense, setDense] = React.useState(false);

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: string
	) => {
		const isAsc = orderBy === property && order === 'asc';
		const newOrder: Order = isAsc ? 'desc' : 'asc';
		console.log('handleRequestSort', property, newOrder);

		onSortChange(property, newOrder);
	};

	const handleSelectAllClick = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		if (event.target.checked) {
			const newSelected = rows.map(n => n.id);
			setSelected(newSelected);
			return;
		}
		setSelected([]);
	};

	// const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
	// 	const selectedIndex = selected.indexOf(id);
	// 	let newSelected: readonly number[] = [];

	// 	if (selectedIndex === -1) {
	// 		newSelected = newSelected.concat(selected, id);
	// 	} else if (selectedIndex === 0) {
	// 		newSelected = newSelected.concat(selected.slice(1));
	// 	} else if (selectedIndex === selected.length - 1) {
	// 		newSelected = newSelected.concat(selected.slice(0, -1));
	// 	} else if (selectedIndex > 0) {
	// 		newSelected = newSelected.concat(
	// 			selected.slice(0, selectedIndex),
	// 			selected.slice(selectedIndex + 1)
	// 		);
	// 	}
	// 	setSelected(newSelected);
	// };

	const isSelected = (id: number) => selected.indexOf(id) !== -1;

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		(paginationInfo?.page ?? 0) > 0
			? Math.max(0, rowsPerPage - rows.length)
			: 0;

	console.log('emptyRows', emptyRows);

	console.log('rowsPerPage', rowsPerPage);
	console.log('rowsLength', rows.length);
	console.log('pagination info ', paginationInfo);

	// const visibleRows = React.useMemo(
	// 	() =>
	// 		stableSort<T>(rows, getComparator(order, orderBy)).slice(
	// 			page * rowsPerPage,
	// 			page * rowsPerPage + rowsPerPage
	// 		),
	// 	[order, orderBy, page, rowsPerPage]
	// );

	if (isMobile) {
		return (
			<>
				<Pagination
					count={paginationInfo?.totalPages ?? 0}
					page={paginationInfo?.page ?? 0}
					onChange={(event: unknown, newPage: number) => {
						handleChangePage(newPage);
					}}
				/>
				{rows.map((row, index) => {
					return (
						<Card key={index} sx={{ mb: 2 }}>
							{headCells.map(headCell => {
								const cellContent: React.ReactNode =
									headCell.renderCell
										? headCell.renderCell(row)
										: (row[
												headCell.id as keyof T
										  ] as React.ReactNode);
								return (
									<CardContent key={headCell.id}>
										<Box>
											<Typography fontWeight="bold">
												{headCell.label}
											</Typography>
										</Box>
										<Box>{cellContent}</Box>
									</CardContent>
								);
							})}
						</Card>
					);
				})}
				<Pagination
					count={paginationInfo?.totalPages ?? 0}
					page={paginationInfo?.page ?? 0}
					onChange={(event: unknown, newPage: number) => {
						handleChangePage(newPage);
					}}
				/>
			</>
		);
	}

	return (
		<Box sx={{ width: '100%' }}>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={paginationInfo?.total ?? 0}
				rowsPerPage={rowsPerPage}
				page={paginationInfo?.page ? paginationInfo.page - 1 : 0}
				onPageChange={(event: unknown, newPage: number) => {
					handleChangePage(newPage);
				}}
				showFirstButton
				showLastButton
				onRowsPerPageChange={(
					event: React.ChangeEvent<HTMLInputElement>
				) => {
					handleChangeRowsPerPage(parseInt(event.target.value));
				}}
			/>
			<TableContainer>
				<Table
					sx={{ minWidth: 750 }}
					aria-labelledby="tableTitle"
					size={dense ? 'small' : 'medium'}
				>
					<CustomTableHead
						headCells={headCells}
						numSelected={selected.length}
						order={order}
						orderBy={orderBy}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={rows.length}
					/>
					<TableBody>
						{rows.map((row, index) => {
							// const isItemSelected = isSelected(row.id);
							// const rowContent = renderRow(row, index);

							return (
								<TableRow
									hover
									// onClick={event =>
									// 	handleClick(event, row.id)
									// }
									// role="checkbox"
									// aria-checked={isItemSelected}
									tabIndex={-1}
									key={row.id}
									// selected={isItemSelected}

									sx={{ cursor: 'pointer' }}
								>
									{headCells.map(headCell => {
										const cellContent: React.ReactNode =
											headCell.renderCell
												? headCell.renderCell(row)
												: (row[
														headCell.id as keyof T
												  ] as React.ReactNode);
										return (
											<TableCell key={headCell.id}>
												{cellContent}
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
						{emptyRows > 0 && (
							<TableRow
								style={{
									height: (dense ? 33 : 53) * emptyRows,
								}}
							>
								<TableCell colSpan={6}></TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={paginationInfo?.total ?? 0}
				rowsPerPage={rowsPerPage}
				page={paginationInfo?.page ? paginationInfo.page - 1 : 0}
				onPageChange={(event: unknown, newPage: number) => {
					handleChangePage(newPage);
				}}
				showFirstButton
				showLastButton
				onRowsPerPageChange={(
					event: React.ChangeEvent<HTMLInputElement>
				) => {
					handleChangeRowsPerPage(parseInt(event.target.value));
				}}
			/>
		</Box>
	);
}
