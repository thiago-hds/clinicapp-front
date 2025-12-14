'use client';
import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	FC,
} from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface SnackbarState {
	open: boolean;
	message: string;
	severity: 'success' | 'info' | 'warning' | 'error';
}

interface SnackbarContextType {
	showSnackbar: (
		message: string,
		severity?: SnackbarState['severity']
	) => void;
}

const defaultSnackbarState: SnackbarState = {
	open: false,
	message: '',
	severity: 'info',
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
	undefined
);

export const SnackbarProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [snackbar, setSnackbar] =
		useState<SnackbarState>(defaultSnackbarState);

	const showSnackbar = (
		message: string,
		severity: SnackbarState['severity'] = 'info'
	) => {
		setSnackbar({ open: true, message, severity });
	};

	const closeSnackbar = () => {
		setSnackbar(defaultSnackbarState);
	};

	return (
		<SnackbarContext.Provider value={{ showSnackbar }}>
			{children}
			<Snackbar
				open={snackbar.open}
				autoHideDuration={6000}
				onClose={closeSnackbar}
			>
				<MuiAlert onClose={closeSnackbar} severity={snackbar.severity}>
					{snackbar.message}
				</MuiAlert>
			</Snackbar>
		</SnackbarContext.Provider>
	);
};

export const useSnackbar = (): SnackbarContextType => {
	const context = useContext(SnackbarContext);
	if (!context) {
		throw new Error('useSnackbar must be used within a SnackbarProvider');
	}
	return context;
};
