import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import FaceIcon from '@mui/icons-material/Face';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NextLink from 'next/link';

export const mainListItems = (
	<React.Fragment>
		<ListItemButton
			sx={{
				display: 'flex',
				justifyContent: 'center',
			}}
			component={NextLink}
			href="/dashboard/clients/index"
		>
			<ListItemIcon
				sx={{
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<PeopleIcon />
			</ListItemIcon>
			<ListItemText primary="Clientes" />
		</ListItemButton>
		<ListItemButton
			sx={{
				display: 'flex',
				justifyContent: 'center',
			}}
			component={NextLink}
			href="/dashboard/users/index"
		>
			<ListItemIcon
				sx={{
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<PersonIcon />
			</ListItemIcon>
			<ListItemText primary="Usuários" />
		</ListItemButton>
	</React.Fragment>
);

export const secondaryListItems = (
	<React.Fragment>
		{/* <ListSubheader component="div" inset>
			Saved reports
		</ListSubheader>
		<ListItemButton>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary="Current month" />
		</ListItemButton>
		<ListItemButton>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary="Last quarter" />
		</ListItemButton>
		<ListItemButton>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary="Year-end sale" />
		</ListItemButton> */}
	</React.Fragment>
);
