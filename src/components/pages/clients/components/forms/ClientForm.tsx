'use client';

import CepCustomInput from '@/components/inputs/CepCustomInput';
import CpfCustomInput from '@/components/inputs/CpfCustomInput';
import PhoneCustomInput from '@/components/inputs/PhoneCustomInput';
import fetchCep from '@/util/fetchCep';
import { validateCpf } from '@/util/validateDocument';
import {
	Grid,
	TextField,
	Button,
	Stack,
	Container,
	Typography,
	Backdrop,
	CircularProgress,
	Autocomplete,
	Box,
	SnackbarContent,
} from '@mui/material';
import { DatePicker, DateValidationError } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';
import dayjs, { Dayjs } from 'dayjs';

import { getDatePickerValidationErrorMessage } from '@/util/validation/getDatePickerValidationErrorMessage';
import { ClientFormData } from '../../types/types';
import { useClientActions } from '../../hooks/useClientActions';
import { SnackbarProvider } from '@/hooks/useSnackBar';

interface ClientFormProps {
	client: Client | null;
	isLoading?: boolean;
}

export const ClientForm: React.FC<ClientFormProps> = ({
	client,
	isLoading = false,
}) => {
	const {
		register,
		handleSubmit,
		formState,
		control,
		getValues,
		setValue,
		reset,
		setError,
	} = useForm<ClientFormData>({
		mode: 'onBlur',
	});
	const { errors } = formState;

	const { saveClient } = useClientActions();

	const [addressFound, setAddressFound] = useState<boolean>(false);
	const editMode = client != null;
	const shrink = editMode ? editMode : undefined;
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
			dateOfBirth: client.dateOfBirth
				? dayjs(client.dateOfBirth)
				: undefined,
			dateOfFirstVisit: client.dateOfFirstVisit,
			landlinePhone: client.landlinePhone,
			mobilePhone: client.mobilePhone,
			email: client.email,
			occupation: client.occupation,
			notes: client.notes,
			howTheyFoundUs: client.howTheyFoundUs,
			address: {
				zipcode: client.address?.zipcode,
				streetName: client.address?.streetName,
				number: String(client.address?.number),
				district: client.address?.district,
				city: client.address?.zipcode,
				state: client.address?.state,
				addressAdditionalDetails: client.address?.additionalDetails,
			},
		};

		console.log('formData', formData);

		reset(formData);
	}, [client, reset]);

	async function sendForm(formData: ClientFormData) {
		saveClient(formData, client?.id);
	}

	async function handleCepBlur() {
		const endereco = await fetchCep(getValues('address.zipcode'));
		if (!endereco) {
			return;
		}

		setValue('address.streetName', endereco.logradouro);
		setValue('address.streetName', endereco.logradouro);
		setValue('address.city', endereco.localidade);
		setValue('address.state', endereco.uf);
		setValue('address.district', endereco.bairro);
		setAddressFound(true);
	}

	return (
		<SnackbarProvider>
			<Container maxWidth="lg">
				<Box
					component="form"
					onSubmit={handleSubmit(sendForm)}
					noValidate
				>
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
								label="Sobrenomeome"
								required
								error={!!errors.lastName?.message}
								InputLabelProps={{ shrink: shrink }}
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
								InputLabelProps={{ shrink: shrink }}
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
								InputLabelProps={{ shrink: shrink }}
								{...register('rg')}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
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
											slotProps={{
												field: {
													clearable: true,
												},
												textField: {
													helperText:
														errors.dateOfBirth
															?.message,
												},
											}}
											value={
												field.value ? field.value : null
											}
											onChange={date => {
												field.onChange(date);
											}}
											onError={(
												newError: DateValidationError
											) =>
												setError('dateOfBirth', {
													type: 'custom',
													message:
														getDatePickerValidationErrorMessage(
															newError
														),
												})
											}
										/>
									);
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
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
											slotProps={{
												field: {
													clearable: true,
												},
												textField: {
													helperText:
														errors.dateOfFirstVisit
															?.message,
												},
											}}
											value={
												field.value
													? dayjs(field.value)
													: null
											}
											onChange={date => {
												field.onChange(date);
											}}
											onError={(
												newError: DateValidationError
											) =>
												setError('dateOfFirstVisit', {
													type: 'custom',
													message:
														getDatePickerValidationErrorMessage(
															newError
														),
												})
											}
										/>
									);
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={6}>
							<TextField
								fullWidth
								label="Profissão"
								InputLabelProps={{ shrink: shrink }}
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
												field.onChange(
													value?.id ?? null
												);
											}}
											renderInput={params => (
												<TextField
													{...params}
													InputLabelProps={{
														shrink: shrink,
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
								InputLabelProps={{ shrink: shrink }}
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
								InputLabelProps={{ shrink: shrink }}
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
								InputLabelProps={{ shrink: shrink }}
								{...register('mobilePhone')}
							/>
						</Grid>
						<Grid item xs={12} sm={4}>
							<TextField
								fullWidth
								label="E-mail"
								InputLabelProps={{ shrink: shrink }}
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
								error={!!errors.address?.zipcode?.message}
								helperText={errors.address?.zipcode?.message}
								InputProps={{
									inputComponent: CepCustomInput as any,
								}}
								InputLabelProps={{ shrink: shrink }}
								{...register('address.zipcode', {
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
								error={!!errors.address?.streetName?.message}
								helperText={errors.address?.streetName?.message}
								InputLabelProps={{
									shrink: addressFound || editMode,
								}}
								{...register('address.streetName', {
									required: 'Logradouro é obrigatório',
								})}
							/>
						</Grid>
						<Grid item xs={12} sm={2}>
							<TextField
								fullWidth
								label="Número"
								required
								error={!!errors.address?.number?.message}
								helperText={errors.address?.number?.message}
								InputLabelProps={{
									shrink: addressFound || editMode,
								}}
								{...register('address.number', {
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
								{...register('address.district')}
							/>
						</Grid>

						<Grid item xs={12} sm={6}>
							<TextField
								fullWidth
								label="Complemento"
								InputLabelProps={{
									shrink: addressFound || editMode,
								}}
								{...register(
									'address.addressAdditionalDetails'
								)}
							/>
						</Grid>
						<Grid item xs={12} sm={10}>
							<TextField
								fullWidth
								label="Cidade"
								required
								error={!!errors.address?.city?.message}
								helperText={errors.address?.city?.message}
								InputLabelProps={{
									shrink: addressFound || editMode,
								}}
								{...register('address.city', {
									required: 'Cidade é obrigatório',
								})}
							/>
						</Grid>
						<Grid item xs={12} sm={2}>
							<TextField
								fullWidth
								label="UF"
								required
								error={!!errors.address?.state?.message}
								helperText={errors.address?.state?.message}
								InputLabelProps={{
									shrink: addressFound || editMode,
								}}
								{...register('address.state', {
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
									href={`/dashboard/clients/index`}
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

const howTheyFoundUsOptions = [
	{ label: 'Google', id: 'google' },
	{ label: 'Instagram', id: 'instagram' },
	{ label: 'Indicação', id: 'indicacao' },
	{ label: 'Outro', id: 'outro' },
];
