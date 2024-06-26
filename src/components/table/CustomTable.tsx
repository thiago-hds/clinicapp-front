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

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
	order: Order,
	orderBy: Key
): (
	a: { [key in Key]: number | string },
	b: { [key in Key]: number | string }
) => number {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(
	array: readonly T[],
	comparator: (a: T, b: T) => number
) {
	const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map(el => el[0]);
}

interface TableItem {
	id: number;
}

export interface CustomTableHeadCell {
	disablePadding: boolean;
	id: string;
	label: string;
	numeric: boolean;
}

interface CustomTableHeadProps<T> {
	numSelected: number;
	onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
	headCells: CustomTableHeadCell[];
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
	readonly headCells: CustomTableHeadCell[];
	readonly rows: T[];
	readonly renderRow: (row: T, index: number) => React.ReactNode;
	readonly paginationInfo: PaginationInfo | null;
	readonly page: number;
	readonly rowsPerPage: number;
	handleChangePage: (page: number) => void;
	handleChangeRowsPerPage: (rowsPerPage: number) => void;
}

export function CustomTable<T extends TableItem>({
	headCells,
	rows,
	renderRow,
	paginationInfo,
	page,
	rowsPerPage,
	handleChangePage,
	handleChangeRowsPerPage,
}: CustomTableProps<T>) {
	const [order, setOrder] = React.useState<Order>('asc');
	const [orderBy, setOrderBy] = React.useState<string>('calories');
	const [selected, setSelected] = React.useState<readonly number[]>([]);
	const [dense, setDense] = React.useState(false);

	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: string
	) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
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
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	// const visibleRows = React.useMemo(
	// 	() =>
	// 		stableSort<T>(rows, getComparator(order, orderBy)).slice(
	// 			page * rowsPerPage,
	// 			page * rowsPerPage + rowsPerPage
	// 		),
	// 	[order, orderBy, page, rowsPerPage]
	// );

	return (
		<Box sx={{ width: '100%' }}>
			{/* <CustomTableToolbar numSelected={selected.length} /> */}
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
							const rowContent = renderRow(row, index);

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
									{/* <TableCell padding="checkbox">
										<Checkbox
											color="primary"
											checked={isItemSelected}
											inputProps={{
												'aria-labelledby': labelId,
											}}
										/>
									</TableCell> */}

									{rowContent}
								</TableRow>
							);
						})}
						{emptyRows > 0 && (
							<TableRow
								style={{
									height: (dense ? 33 : 53) * emptyRows,
								}}
							>
								<TableCell colSpan={6} />
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={paginationInfo?.itemCount ?? 0}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={(event: unknown, newPage: number) => {
					handleChangePage(newPage);
				}}
				onRowsPerPageChange={(
					event: React.ChangeEvent<HTMLInputElement>
				) => {
					handleChangeRowsPerPage(parseInt(event.target.value));
				}}
			/>
		</Box>
	);
}
