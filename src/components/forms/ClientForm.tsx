'use client';

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
	Autocomplete,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import axios, { Axios, AxiosError } from 'axios';
import { LinkSharp } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';
import { formatDate } from '@/util/formatter';
import dayjs from 'dayjs';

export interface ClientFormData {
	firstName: string;
	lastName: string;
	cpf: string;
	rg: string;
	dateOfBirth?: string;
	dateOfFirstVisit: string;
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
	isLoading?: boolean;
	client: Client | null;
}

export function ClientForm({
	isLoading = false,
	client = null,
}: ClientFormProps) {
	const {
		register,
		handleSubmit,
		formState,
		control,
		getValues,
		setValue,
		reset,
	} = useForm<ClientFormData>({
		mode: 'onBlur',
	});
	const { errors } = formState;

	const [addressFound, setAddressFound] = useState<boolean>(false);
	const editMode = client != null;
	const router = useRouter();

	const howTheyFoundUsValue = getValues('howTheyFoundUs');
	const selectedHowTheyFoundUsOption =
		howTheyFoundUsOptions.find(
			option => option.id == howTheyFoundUsValue
		) ?? null;

	useEffect(() => {
		if (!client) {
			return;
		}

		const formData: ClientFormData = {
			firstName: client.firstName,
			lastName: client.lastName,
			cpf: client.cpf,
			rg: client.rg,
			dateOfBirth: client.dateOfBirth,
			dateOfFirstVisit: client.dateOfFirstVisit,
			landlinePhone: client.landlinePhone,
			mobilePhone: client.mobilePhone,
			email: client.email,
			occupation: client.occupation,
			notes: client.notes,
			zipcode: client.address?.zipcode,
			streetName: client.address?.streetName,
			addressNumber: String(client.address?.number),
			district: client.address?.district,
			addressAdditionalDetails: client.address?.additionalDetails,
			city: client.address?.zipcode,
			state: client.address?.state,
			howTheyFoundUs: client.howTheyFoundUs,
		};

		console.log('formData', formData);

		reset(formData);
	}, [client, reset]);

	async function sendForm(formData: ClientFormData) {
		if (!client) {
			return;
		}

		const instance = axios.create({
			baseURL: 'http://localhost:8000',
		});

		try {
			const response = await instance.put(
				`/clients/${client.id}`,
				formData
			);
			console.log('response', response.data);
			router.push('/clients/index');
		} catch (err) {
			if (err instanceof AxiosError) {
				console.error(err?.response?.data);
			} else {
				console.error(err);
			}
		}
	}

	async function handleCepBlur() {
		const endereco = await fetchCep(getValues('zipcode'));
		if (!endereco) {
			return;
		}

		setValue('streetName', endereco.logradouro);
		setValue('streetName', endereco.logradouro);
		setValue('city', endereco.localidade);
		setValue('state', endereco.uf);
		setValue('district', endereco.bairro);
		setAddressFound(true);
	}

	return (
		<Container maxWidth="lg">
			<form onSubmit={handleSubmit(sendForm)} noValidate>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography variant="h3" sx={{ marginTop: 2 }}>
							Dados Básicos
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							fullWidth
							label="Nome"
							required
							error={!!errors.firstName?.message}
							InputLabelProps={{ shrink: editMode }}
							helperText={errors.firstName?.message}
							{...register('firstName', {
								required: 'Nome é obrigatório',
							})}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							fullWidth
							label="Sobrenomeome"
							required
							error={!!errors.lastName?.message}
							InputLabelProps={{ shrink: editMode }}
							helperText={errors.lastName?.message}
							{...register('lastName', {
								required: 'Sobrenome é obrigatório',
							})}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							fullWidth
							label="CPF"
							required
							error={!!errors.cpf?.message}
							helperText={errors.cpf?.message}
							placeholder="999.999.999-99"
							InputLabelProps={{ shrink: editMode }}
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
					<Grid item xs={12} sm={6}>
						<TextField
							fullWidth
							label="RG"
							InputLabelProps={{ shrink: editMode }}
							{...register('rg')}
						/>
					</Grid>
					<Grid item xs={12} sm={3}>
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
										value={
											field.value
												? dayjs(field.value)
												: null
										}
										onChange={date => {
											field.onChange(date);
										}}
									/>
								);
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={3}>
						<Controller
							control={control}
							name="dateOfFirstVisit"
							render={({ field }) => {
								return (
									<DatePicker
										sx={{ width: '100%' }}
										disableFuture
										label="Data do Primeiro Atendimento"
										inputRef={field.ref}
										value={
											field.value
												? dayjs(field.value)
												: null
										}
										onChange={date => {
											field.onChange(date);
										}}
									/>
								);
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							fullWidth
							label="Profissão"
							InputLabelProps={{ shrink: editMode }}
							{...register('occupation')}
						/>
					</Grid>
					<Grid item xs={12}>
						<Controller
							control={control}
							name="howTheyFoundUs"
							render={({ field }) => {
								return (
									<Autocomplete
										disablePortal
										options={howTheyFoundUsOptions}
										value={selectedHowTheyFoundUsOption}
										onChange={(_, value) => {
											field.onChange(value?.id ?? null);
										}}
										renderInput={params => (
											<TextField
												{...params}
												InputLabelProps={{
													shrink: editMode,
												}}
												label="Como nos conheceu"
											/>
										)}
									/>
								);
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							label="Observação"
							{...register('notes')}
							InputLabelProps={{ shrink: editMode }}
							multiline
							rows={5}
						/>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="h3" sx={{ marginTop: 2 }}>
							Dados de Contato
						</Typography>
					</Grid>
					<Grid item xs={12} sm={4}>
						<TextField
							fullWidth
							label="Telefone Fixo"
							placeholder="(99) 9999-99999"
							InputProps={{
								inputComponent: PhoneCustomInput as any,
							}}
							InputLabelProps={{ shrink: editMode }}
							{...register('landlinePhone')}
						/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<TextField
							fullWidth
							label="Celular"
							placeholder="(99) 9999-99999"
							InputProps={{
								inputComponent: PhoneCustomInput as any,
							}}
							InputLabelProps={{ shrink: editMode }}
							{...register('mobilePhone')}
						/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<TextField
							fullWidth
							label="E-mail"
							InputLabelProps={{ shrink: editMode }}
							{...register('email')}
						/>
					</Grid>

					<Grid item xs={12}>
						<Typography variant="h3" sx={{ marginTop: 2 }}>
							Dados de Endereço
						</Typography>
					</Grid>

					<Grid item xs={12} sm={4}>
						<TextField
							fullWidth
							label="CEP"
							required
							error={!!errors.zipcode?.message}
							helperText={errors.zipcode?.message}
							InputProps={{
								inputComponent: CepCustomInput as any,
							}}
							InputLabelProps={{ shrink: editMode }}
							{...register('zipcode', {
								required: 'CEP é obrigatório',
								onBlur: () => {
									handleCepBlur();
								},
							})}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							fullWidth
							label="Logradouro"
							required
							error={!!errors.streetName?.message}
							helperText={errors.streetName?.message}
							InputLabelProps={{
								shrink: addressFound || editMode,
							}}
							{...register('streetName', {
								required: 'Logradouro é obrigatório',
							})}
						/>
					</Grid>
					<Grid item xs={12} sm={2}>
						<TextField
							fullWidth
							label="Número"
							required
							error={!!errors.addressNumber?.message}
							helperText={errors.addressNumber?.message}
							InputLabelProps={{
								shrink: addressFound || editMode,
							}}
							{...register('addressNumber', {
								required: 'Número é obrigatório',
							})}
						/>
					</Grid>

					<Grid item xs={12} sm={6}>
						<TextField
							fullWidth
							label="Bairro"
							InputLabelProps={{
								shrink: addressFound || editMode,
							}}
							{...register('district')}
						/>
					</Grid>

					<Grid item xs={12} sm={6}>
						<TextField
							fullWidth
							label="Complemento"
							InputLabelProps={{
								shrink: addressFound || editMode,
							}}
							{...register('addressAdditionalDetails')}
						/>
					</Grid>
					<Grid item xs={12} sm={10}>
						<TextField
							fullWidth
							label="Cidade"
							required
							error={!!errors.city?.message}
							helperText={errors.city?.message}
							InputLabelProps={{
								shrink: addressFound || editMode,
							}}
							{...register('city', {
								required: 'Cidade é obrigatório',
							})}
						/>
					</Grid>
					<Grid item xs={12} sm={2}>
						<TextField
							fullWidth
							label="UF"
							required
							error={!!errors.state?.message}
							helperText={errors.state?.message}
							InputLabelProps={{
								shrink: addressFound || editMode,
							}}
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

const howTheyFoundUsOptions = [
	{ label: 'Google', id: 'google' },
	{ label: 'Instagram', id: 'instagram' },
	{ label: 'Indicação', id: 'indicacao' },
	{ label: 'Outro', id: 'outro' },
];
