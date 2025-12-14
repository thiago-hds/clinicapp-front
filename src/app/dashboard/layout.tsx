import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

import theme from '../../themes/dashboardTheme';
import BaseLayout from '@/components/layout/BaseLayout';
import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from '@/hooks/useSnackBar';

export const metadata: Metadata = {
	title: 'ClínicaApp',
	description: 'Aplicação para gerenciamento de clínica de pequeno porte',
};

const roboto = Roboto({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-roboto',
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR" className={roboto.variable}>
			<body>
				<AppRouterCacheProvider>
					<SnackbarProvider>
						<ThemeProvider theme={theme}>
							<CssBaseline />
							<BaseLayout> {children}</BaseLayout>
						</ThemeProvider>
					</SnackbarProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
}
