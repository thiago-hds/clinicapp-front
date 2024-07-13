import { Box, Button, Grid, Paper, TextField } from '@mui/material';

interface ClientFilterFormProps {
	query: string;
	onQueryChange: (value: string) => void;
	onSearchClick: () => void;
}

export const ClientFilterForm: React.FC<ClientFilterFormProps> = ({
	query,
	onQueryChange,
	onSearchClick,
}) => {
	return (
		<Paper elevation={1} sx={{ marginBottom: '12px' }}>
			<Grid container alignItems="center" gap={1}>
				<Grid item xs={12} sm>
					<TextField
						fullWidth
						label="Nome"
						value={query}
						onChange={(
							event: React.ChangeEvent<HTMLInputElement>
						) => {
							onQueryChange(event.target.value);
						}}
					/>
				</Grid>
				<Grid item xs={12} sm="auto">
					<Box sx={{ display: 'flex', justifyContent: 'center' }}>
						<Button onClick={onSearchClick}>Pesquisar</Button>
					</Box>
				</Grid>
			</Grid>
		</Paper>
	);
};
