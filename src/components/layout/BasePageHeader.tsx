import { FC } from 'react';
import { Typography, Box, Breadcrumbs, Link } from '@mui/material';

interface BasePageHeaderProps {
	title: string;
}

const BasePageHeader: FC<BasePageHeaderProps> = ({ title }) => {
	return (
		<Box sx={{ marginBottom: 5 }}>
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
			<Box>
				<Typography variant="h2" sx={{ marginTop: 0.75 }}>
					{title}
				</Typography>
			</Box>
		</Box>
	);
};

export default BasePageHeader;
