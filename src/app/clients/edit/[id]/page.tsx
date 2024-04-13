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
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import axios, { Axios, AxiosError } from 'axios';
import { LinkSharp } from '@mui/icons-material';
import { useParams, useRouter } from 'next/navigation';
import NextLink from 'next/link';
import { ClienteFormData, ClientForm } from '@/components/forms/ClientForm';

interface ClienteEditPageParams {
	params: { id: string };
}

export default function Page({ params }: ClienteEditPageParams) {
	const router = useRouter();

	const [client, setClient] = useState<Client | null>(null);

	useEffect(() => {
		async function getData() {
			const instance = axios.create({
				baseURL: 'http://localhost:8000',
			});

			try {
				const response = await instance.get(`/clients/${params.id}`);
				setClient(response.data?.data);
			} catch (err) {
				if (err instanceof AxiosError) {
					console.error(err?.response?.data);
				} else {
					console.error(err);
				}
			}
		}
		getData();
	}, [params]);

	async function sendForm(data: ClienteFormData) {
		const instance = axios.create({
			baseURL: 'http://localhost:8000',
		});

		try {
			const response = await instance.post('/clients', data);
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

	return (
		<Paper sx={{ padding: 5 }}>
			<BasePageHeader title={`Editar Cliente ${params.id}`} />
			<ClientForm onFormSubmit={sendForm} client={client} />
		</Paper>
	);
}
