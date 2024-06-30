import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';

import theme from '../../themes/dashboardTheme';
import BaseLayout from '@/components/layout/BaseLayout';

export const metadata: Metadata = {
	title: 'ClínicaApp',
	description: 'Aplicação para gerenciamento de clínica de pequeno porte',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<body>
				<AppRouterCacheProvider>
					<ThemeProvider theme={theme}>{children}</ThemeProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
}
