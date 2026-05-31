'use client';

import {
	Grid,
	TextField,
	Button,
	Stack,
	Container,
	Backdrop,
	CircularProgress,
	Box,
} from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import NextLink from 'next/link';
import { UserFormData } from '../../types/types';
import { useUserActions } from '../../hooks/useUserActions';
import { SnackbarProvider } from '@/hooks/useSnackBar';

interface UserFormProps {
	user: User | null;
	isLoading?: boolean;
}

export const UserForm: React.FC<UserFormProps> = ({
	user,
	isLoading = false,
}) => {
	const {
		register,
		handleSubmit,
		formState,
		reset,
	} = useForm<UserFormData>({
		mode: 'onBlur',
	});
	const { errors } = formState;

	const { saveUser } = useUserActions();

	const editMode = user != null;
	const shrink = editMode ? editMode : undefined;

	useEffect(() => {
		if (!user) {
			return;
		}

		const formData: UserFormData = {
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
		};

		reset(formData);
	}, [user, reset]);

	async function sendForm(formData: UserFormData) {
		saveUser(formData, user?.id);
	}

	return (
		<SnackbarProvider>
			<Container maxWidth="lg">
				<Box
					component="form"
					onSubmit={handleSubmit(sendForm)}
					noValidate
					sx={{ mt: 3 }}
				>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								fullWidth
								label="Nome"
								required
								error={!!errors.firstName?.message}
								InputLabelProps={{
									shrink: shrink,
								}}
								helperText={errors.firstName?.message}
								{...register('firstName', {
									required: 'Nome é obrigatório',
								})}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								fullWidth
								label="Sobrenome"
								required
								error={!!errors.lastName?.message}
								InputLabelProps={{ shrink: shrink }}
								helperText={errors.lastName?.message}
								{...register('lastName', {
									required: 'Sobrenome é obrigatório',
								})}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								label="E-mail"
								required
								error={!!errors.email?.message}
								InputLabelProps={{ shrink: shrink }}
								helperText={errors.email?.message}
								{...register('email', {
									required: 'E-mail é obrigatório',
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: 'E-mail inválido',
									},
								})}
							/>
						</Grid>
						{!editMode && (
							<Grid item xs={12}>
								<TextField
									fullWidth
									label="Senha"
									type="password"
									required
									error={!!errors.password?.message}
									helperText={errors.password?.message}
									{...register('password', {
										required: 'Senha é obrigatória',
										minLength: {
											value: 6,
											message: 'A senha deve ter pelo menos 6 caracteres',
										},
									})}
								/>
							</Grid>
						)}
						<Grid item xs={12}>
							<Stack
								direction="row"
								spacing={2}
								justifyContent="center"
								sx={{ mt: 3 }}
							>
								<Button
									color="error"
									variant="contained"
									href={`/dashboard/users/index`}
									LinkComponent={NextLink}
								>
									Cancelar
								</Button>
								<Button type="submit" color="success" variant="contained">
									Gravar
								</Button>
							</Stack>
						</Grid>
					</Grid>
				</Box>
				<Backdrop
					sx={{
						color: '#fff',
						zIndex: theme => theme.zIndex.drawer + 1,
					}}
					open={isLoading}
				>
					<CircularProgress color="inherit" />
				</Backdrop>
			</Container>
		</SnackbarProvider>
	);
};
