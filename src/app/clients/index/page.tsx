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
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import axios, { Axios, AxiosError } from 'axios';
import { LinkSharp } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export default function Page() {
	const router = useRouter();

	async function fetchClients() {
		const instance = axios.create({
			baseURL: 'http://localhost:8000',
		});

		try {
			const response = await instance.post('/clients', data);
			console.log('response', response.data);
			router.push('/clients');
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
			<BasePageHeader title="Clientes" />
			<Container maxWidth="lg"></Container>
		</Paper>
	);
}
