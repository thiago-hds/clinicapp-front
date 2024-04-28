'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { ptBR } from '@mui/material/locale';

const roboto = Roboto({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
	display: 'swap',
});

const theme = createTheme(
	{
		typography: {
			fontFamily: roboto.style.fontFamily,
			h2: {
				fontSize: '2rem',
				fontWeight: 400,
			},
			h3: {
				fontSize: '1.5rem',
				fontWeight: 400,
			},
		},
		components: {
			MuiPaper: {
				styleOverrides: {
					root: {
						padding: '1rem',
					},
				},
			},
			MuiButton: {
				defaultProps: {
					variant: 'contained',
				},
			},
		},
	},
	ptBR
);

export default theme;
