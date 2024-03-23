import { FC } from 'react';
import { Typography, Box, Breadcrumbs, Link } from '@mui/material';

interface BasePageHeaderProps {
	title: string;
}

const BasePageHeader: FC<BasePageHeaderProps> = ({ title }) => {
	return (
		<Box>
			<Breadcrumbs aria-label="breadcrumb">
				<Link underline="hover" color="inherit" href="/">
					MUI
				</Link>
				<Link
					underline="hover"
					color="inherit"
					href="/material-ui/getting-started/installation/"
				>
					Core
				</Link>
				<Typography color="text.primary">Breadcrumbs</Typography>
			</Breadcrumbs>
			<Box>
				<Typography
					variant="h2"
					sx={{ marginTop: 0.75, marginBottom: 2 }}
				>
					{title}
				</Typography>
			</Box>
		</Box>
	);
};

export default BasePageHeader;
