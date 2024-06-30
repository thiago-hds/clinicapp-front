'use client';

import { TextField, Button, Box, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

export interface LoginFormData {
	email: string;
	password: string;
}

export function LoginForm() {
	const {
		register,
		handleSubmit,
		formState,

		setError,
	} = useForm<LoginFormData>({
		mode: 'onBlur',
	});
	const { errors } = formState;

	const router = useRouter();

	async function sendForm(formData: LoginFormData) {
		console.log('formdata', formData);

		try {
			const response = await fetch('/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: formData.email,
					password: formData.password,
				}),
			});
			console.log('response', response);
			router.push('/dashboard/clients/index');
		} catch (err) {
			if (err instanceof AxiosError) {
				setError('root.serverError', {
					type: '400',
					message: err?.response?.data.message,
				});
			} else {
				console.error('ok', err);
			}
		}
	}

	return (
		<Box
			component="form"
			onSubmit={handleSubmit(sendForm)}
			noValidate
			sx={{ mt: 1 }}
		>
			{errors.root?.serverError && (
				<Alert severity="error">
					{errors.root?.serverError.message}
				</Alert>
			)}
			<TextField
				margin="normal"
				required
				fullWidth
				label="E-mail"
				autoComplete="email"
				autoFocus
				error={!!errors.email}
				helperText={errors.email?.message}
				{...register('email', { required: 'E-mail é obrigatório' })}
			/>
			<TextField
				margin="normal"
				required
				fullWidth
				label="Senha"
				type="password"
				autoComplete="current-password"
				error={!!errors.password}
				helperText={errors.password?.message}
				{...register('password', { required: 'Senha é obrigatório' })}
			/>
			{/* <FormControlLabel
				control={<Checkbox value="remember" color="primary" />}
				label="Remember me"
			/> */}
			<Button
				type="submit"
				fullWidth
				variant="contained"
				sx={{ mt: 3, mb: 2 }}
			>
				Entrar
			</Button>
			{/* <Grid container>
				<Grid item xs>
					<Link href="#">Esqueceu sua senha</Link>
				</Grid>
				<Grid item>
					<Link href="#">{"Don't have an account? Sign Up"}</Link>
				</Grid>
			</Grid> */}
		</Box>
	);
}
