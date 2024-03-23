import { FC, ReactNode } from 'react';
import { Paper, Container } from '@mui/material';
import BasePageHeader from './BasePageHeader';

interface BaseFormPageLayoutProps {
	children: ReactNode;
	onSaveButtonClick?: () => void;
	onCancelButtonClick?: () => void;
}

const BaseFormPageLayout: FC<BaseFormPageLayoutProps> = ({ children }) => {
	return (
		<Paper sx={{ padding: 5 }}>
			<BasePageHeader title="Novo Cliente" />
			<Container maxWidth="lg">{children}</Container>
		</Paper>
	);
};

export default BaseFormPageLayout;
