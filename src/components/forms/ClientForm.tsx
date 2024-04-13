import CepCustomInput from '@/components/inputs/CepCustomInput';
import CpfCustomInput from '@/components/inputs/CpfCustomInput';
import PhoneCustomInput from '@/components/inputs/PhoneCustomInput';
import BasePageHeader from '@/components/layout/BasePageHeader';
import fetchCep from '@/util/fetchCep';
import { validateCpf } from '@/util/validateDocument';
import {
	Grid,
	TextField,
	Button,
	Stack,
	Paper,
	Container,
	Typography,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Backdrop,
	CircularProgress,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import axios, { Axios, AxiosError } from 'axios';
import { LinkSharp } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';

export interface ClienteFormData {
	name: string;
	cpf: string;
	rg: string;
	dateOfBirth: string;
	dataPrimeiroAtendimento: string;
	landlinePhone: string;
	mobilePhone: string;
	email: string;
	occupation: string;
	notes: string;
	zipcode: string;
	streetName: string;
	addressNumber: string;
	district: string;
	addressAdditionalDetails: string;
	city: string;
	state: string;
	howTheyFoundUs: string;
}

interface ClientFormProps {
	onFormSubmit: (data: ClienteFormData) => void;
	isLoading?: boolean;
	client?: Client;
}

export function ClientForm({
	onFormSubmit,
	isLoading = false,
	client,
}: ClientFormProps) {
	const { register, handleSubmit, formState, control, getValues, setValue } =
		useForm<ClienteFormData>({
			mode: 'onBlur',
		});
	const { errors } = formState;

	const [addressFounded, setAddressFounded] = useState<boolean>(false);

	useEffect(() => {
		if (!client) {
			return;
		}

		setValue('name', client?.name);
	}, [client, setValue]);

	async function handleCepBlur() {
		const endereco = await fetchCep(getValues('zipcode'));
		if (!endereco) {
			return;
		}

		setValue('streetName', endereco.logradouro);
		setValue('city', endereco.localidade);
		setValue('state', endereco.uf);
		setValue('district', endereco.bairro);
		setAddressFounded(true);
	}

	return (
		<Container maxWidth="lg">
			<form onSubmit={handleSubmit(onFormSubmit)} noValidate>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography variant="h3" sx={{ marginTop: 2 }}>
							Dados Básicos
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							label="Nome"
							required
							error={!!errors.name?.message}
							helperText={errors.name?.message}
							{...register('name', {
								required: 'Nome é obrigatório',
							})}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							fullWidth
							label="CPF"
							required
							error={!!errors.cpf?.message}
							helperText={errors.cpf?.message}
							placeholder="999.999.999-99"
							InputProps={{
								inputComponent: CpfCustomInput as any,
							}}
							{...register('cpf', {
								required: 'CPF é obrigatório',
								validate: {
									valid: v =>
										validateCpf(v) ||
										'O CPF inserido é inválido',
								},
							})}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField fullWidth label="RG" {...register('rg')} />
					</Grid>
					<Grid item xs={3}>
						<Controller
							control={control}
							name="dateOfBirth"
							render={({ field }) => {
								return (
									<DatePicker
										sx={{ width: '100%' }}
										disableFuture
										label="Data de Nascimento"
										inputRef={field.ref}
										onChange={date => {
											field.onChange(date);
										}}
									/>
								);
							}}
						/>
					</Grid>
					<Grid item xs={3}>
						<Controller
							control={control}
							name="dataPrimeiroAtendimento"
							render={({ field }) => {
								return (
									<DatePicker
										sx={{ width: '100%' }}
										disableFuture
										label="Data do Primeiro Atendimento"
										inputRef={field.ref}
										onChange={date => {
											field.onChange(date);
										}}
									/>
								);
							}}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							fullWidth
							label="Profissão"
							{...register('occupation')}
						/>
					</Grid>
					<Grid item xs={12}>
						<FormControl fullWidth>
							<InputLabel id="como-nos-conheceu-label">
								Como nos conheceu
							</InputLabel>
							<Select
								labelId="como-nos-conheceu-label"
								id="demo-simple-select"
								{...register('howTheyFoundUs')}
								label="Como nos Conheceu"
							>
								<MenuItem value="google">Google</MenuItem>
								<MenuItem value="indicacao">Indicação</MenuItem>
								<MenuItem value="outro">Outro</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							label="Observação"
							{...register('notes')}
							multiline
							rows={5}
						/>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="h3" sx={{ marginTop: 2 }}>
							Dados de Contato
						</Typography>
					</Grid>
					<Grid item xs={4}>
						<TextField
							fullWidth
							label="Telefone Fixo"
							placeholder="(99) 9999-99999"
							InputProps={{
								inputComponent: PhoneCustomInput as any,
							}}
							{...register('landlinePhone')}
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField
							fullWidth
							label="Celular"
							placeholder="(99) 9999-99999"
							InputProps={{
								inputComponent: PhoneCustomInput as any,
							}}
							{...register('mobilePhone')}
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField
							fullWidth
							label="E-mail"
							{...register('email')}
						/>
					</Grid>

					<Grid item xs={12}>
						<Typography variant="h3" sx={{ marginTop: 2 }}>
							Dados de Endereço
						</Typography>
					</Grid>

					<Grid item xs={4}>
						<TextField
							fullWidth
							label="CEP"
							required
							error={!!errors.zipcode?.message}
							helperText={errors.zipcode?.message}
							InputProps={{
								inputComponent: CepCustomInput as any,
							}}
							{...register('zipcode', {
								required: 'CEP é obrigatório',
								onBlur: () => {
									handleCepBlur();
								},
							})}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							fullWidth
							label="Logradouro"
							required
							error={!!errors.streetName?.message}
							helperText={errors.streetName?.message}
							InputLabelProps={{ shrink: addressFounded }}
							{...register('streetName', {
								required: 'Logradouro é obrigatório',
							})}
						/>
					</Grid>
					<Grid item xs={2}>
						<TextField
							fullWidth
							label="Número"
							required
							error={!!errors.addressNumber?.message}
							helperText={errors.addressNumber?.message}
							InputLabelProps={{ shrink: addressFounded }}
							{...register('addressNumber', {
								required: 'Número é obrigatório',
							})}
						/>
					</Grid>

					<Grid item xs={6}>
						<TextField
							fullWidth
							label="Bairro"
							{...register('district')}
						/>
					</Grid>

					<Grid item xs={6}>
						<TextField
							fullWidth
							label="Complemento"
							{...register('addressAdditionalDetails')}
						/>
					</Grid>
					<Grid item xs={10}>
						<TextField
							fullWidth
							label="Cidade"
							required
							error={!!errors.city?.message}
							helperText={errors.city?.message}
							InputLabelProps={{ shrink: addressFounded }}
							{...register('city', {
								required: 'Cidade é obrigatório',
							})}
						/>
					</Grid>
					<Grid item xs={2}>
						<TextField
							fullWidth
							label="UF"
							required
							error={!!errors.state?.message}
							helperText={errors.state?.message}
							InputLabelProps={{ shrink: addressFounded }}
							{...register('state', {
								required: 'UF é obrigatório',
							})}
						/>
					</Grid>
					<Grid item xs={12}>
						<Stack
							direction="row"
							spacing={2}
							justifyContent="center"
						>
							<Button
								color="error"
								variant="contained"
								href={`/clients/index`}
								LinkComponent={NextLink}
							>
								Cancelar
							</Button>
							<Button type="submit" color="success">
								Gravar
							</Button>
						</Stack>
					</Grid>
				</Grid>
			</form>
			<Backdrop
				sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
				open={isLoading}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
		</Container>
	);
}
