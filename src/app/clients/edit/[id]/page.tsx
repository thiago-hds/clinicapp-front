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
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import axios, { Axios, AxiosError } from 'axios';
import { LinkSharp } from '@mui/icons-material';
import { useParams, useRouter } from 'next/navigation';
import NextLink from 'next/link';
import { ClientFormData, ClientForm } from '@/components/forms/ClientForm';

interface ClienteEditPageParams {
	params: { id: number };
}

export default async function Page({ params }: ClienteEditPageParams) {
	const client = await getClient(params.id);

	return (
		<Paper>
			<BasePageHeader title={`Editar Cliente ${params.id}`} />
			<ClientForm isLoading={false} client={client} />
		</Paper>
	);
}

async function getClient(id: number): Promise<Client | null> {
	const instance = axios.create({
		baseURL: 'http://localhost:8000',
	});

	try {
		const response = await instance.get(`/clients/${id}`);
		return response.data?.data as Client;
	} catch (err) {
		if (err instanceof AxiosError) {
			console.error(err?.response?.data);
		} else {
			console.error(err);
		}
	}
	return null;
}
