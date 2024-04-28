'use client';
import * as React from 'react';
import { styled, SxProps, Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ptBR } from '@mui/x-date-pickers/locales';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

const Copyright: React.FC<{ sx?: SxProps<Theme> }> = ({ sx }) => {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			sx={sx}
		>
			{'Copyright © '}
			<Link color="inherit" href="https://mui.com/">
				ClinicaApp
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
};

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
	'& .MuiDrawer-paper': {
		position: 'relative',
		whiteSpace: 'nowrap',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		boxSizing: 'border-box',
		...(!open && {
			overflowX: 'hidden',
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			width: theme.spacing(7),
			[theme.breakpoints.up('sm')]: {
				width: theme.spacing(9),
			},
		}),
	},
}));

const BaseLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [open, setOpen] = React.useState(false);
	const toggleDrawer = () => {
		setOpen(open => !open);
	};
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<LocalizationProvider
			dateAdapter={AdapterDayjs}
			localeText={
				ptBR.components.MuiLocalizationProvider.defaultProps.localeText
			}
		>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<AppBar
					position="absolute"
					open={open}
					sx={{
						padding: 0,
						zIndex: theme => theme.zIndex.drawer + 1,
					}}
				>
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							aria-label="open drawer"
							onClick={toggleDrawer}
							sx={{
								marginRight: '36px',
							}}
						>
							<MenuIcon />
						</IconButton>
						<Typography
							component="h1"
							variant="h6"
							color="inherit"
							noWrap
							sx={{ flexGrow: 1 }}
						>
							ClinicaApp
						</Typography>
						<IconButton color="inherit">
							<Badge badgeContent={4} color="secondary">
								<NotificationsIcon />
							</Badge>
						</IconButton>
					</Toolbar>
				</AppBar>
				<Drawer
					variant={isMobile ? 'temporary' : 'permanent'}
					open={open}
				>
					<Toolbar />

					<Box sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
						<List component="nav">
							{mainListItems}
							<Divider sx={{ my: 1 }} />
							{secondaryListItems}
						</List>
					</Box>
				</Drawer>
				<Box
					component="main"
					sx={{
						backgroundColor: theme =>
							theme.palette.mode === 'light'
								? theme.palette.grey[100]
								: theme.palette.grey[900],
						flexGrow: 1,
						height: '100vh',
						overflow: 'auto',
					}}
				>
					<Toolbar />
					<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
						{children}
						<Copyright sx={{ pt: 4 }} />
					</Container>
				</Box>
			</Box>
		</LocalizationProvider>
	);
};

export default BaseLayout;
