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
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

interface ClienteForm {
	nome: string;
	cpf: string;
	rg: string;
	dataNascimento: string;
	dataPrimeiroAtendimento: string;
	telefoneFixo: string;
	telefoneCelular: string;
	email: string;
	profissao: string;
	observacao: string;
	enderecoCep: string;
	enderecoLogradouro: string;
	enderecoNumero: string;
	enderecoComplemento: string;
	enderecoCidade: string;
	enderecoUf: string;
}

export default function Page() {
	const { register, handleSubmit, formState, control, getValues, setValue } =
		useForm<ClienteForm>({
			mode: 'onBlur',
		});
	const { errors } = formState;

	const [addressFounded, setAddressFounded] = useState<boolean>(false);

	function onSubmit(data: ClienteForm) {
		console.log(data);
	}

	async function handleCepBlur() {
		const endereco = await fetchCep(getValues('enderecoCep'));
		if (!endereco) {
			return;
		}

		setValue('enderecoLogradouro', endereco.logradouro);
		setValue('enderecoCidade', endereco.localidade);
		setValue('enderecoUf', endereco.uf);
		setAddressFounded(true);
	}

	return (
		<Paper sx={{ padding: 5 }}>
			<BasePageHeader title="Novo Cliente" />
			<Container maxWidth="lg">
				<form onSubmit={handleSubmit(onSubmit)} noValidate>
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
								error={!!errors.nome?.message}
								helperText={errors.nome?.message}
								{...register('nome', {
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
							<TextField
								fullWidth
								label="RG"
								{...register('rg')}
							/>
						</Grid>
						<Grid item xs={3}>
							<Controller
								control={control}
								name="dataNascimento"
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
								{...register('profissao')}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								label="Observação"
								{...register('observacao')}
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
								{...register('telefoneFixo')}
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
								{...register('telefoneCelular')}
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
								error={!!errors.enderecoCep?.message}
								helperText={errors.enderecoCep?.message}
								InputProps={{
									inputComponent: CepCustomInput as any,
								}}
								{...register('enderecoCep', {
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
								error={!!errors.enderecoLogradouro?.message}
								helperText={errors.enderecoLogradouro?.message}
								InputLabelProps={{ shrink: addressFounded }}
								{...register('enderecoLogradouro', {
									required: 'Logradouro é obrigatório',
								})}
							/>
						</Grid>
						<Grid item xs={2}>
							<TextField
								fullWidth
								label="Número"
								required
								error={!!errors.enderecoNumero?.message}
								helperText={errors.enderecoNumero?.message}
								InputLabelProps={{ shrink: addressFounded }}
								{...register('enderecoNumero', {
									required: 'Número é obrigatório',
								})}
							/>
						</Grid>
						<Grid item xs={4}>
							<TextField
								fullWidth
								label="Complemento"
								{...register('enderecoComplemento')}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								fullWidth
								label="Cidade"
								required
								error={!!errors.enderecoCidade?.message}
								helperText={errors.enderecoCidade?.message}
								InputLabelProps={{ shrink: addressFounded }}
								{...register('enderecoCidade', {
									required: 'Cidade é obrigatório',
								})}
							/>
						</Grid>
						<Grid item xs={2}>
							<TextField
								fullWidth
								label="UF"
								required
								error={!!errors.enderecoUf?.message}
								helperText={errors.enderecoUf?.message}
								InputLabelProps={{ shrink: addressFounded }}
								{...register('enderecoUf', {
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
								<Button color="error">Cancelar</Button>
								<Button type="submit" color="success">
									Gravar
								</Button>
							</Stack>
						</Grid>
						{/* telefone fixo, tel celular, email, data de nascimento, profisssão, observações, data do primeiro atendimento */}
						{/* campo profissão */}
						{/* campo "como nos conheceu" - google, indicação, outro */}
					</Grid>
				</form>
			</Container>
		</Paper>
	);
}
