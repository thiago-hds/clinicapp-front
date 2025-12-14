import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { ClientFormData } from '../types/types';
import { axiosInstance } from '@/util/api';
import { useSnackbar } from '@/hooks/useSnackBar';

export function useClientActions() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// const { showSnackbar } = useSnackbar();

	const saveClient = useCallback(
		async (formData: ClientFormData, clientId?: number) => {
			if (!formData) return;

			const editMode = clientId != null;

			setLoading(true);
			setError(null);

			const payload = {
				...formData,
				dateOfBirth:
					formData.dateOfBirth?.format?.('YYYY-MM-DD') ?? null,
				email: formData.email || null,
			};

			try {
				const method = editMode ? 'PATCH' : 'POST';
				const url = editMode ? `/clients/${clientId}` : '/clients';

				const response = await axiosInstance.request({
					method,
					url,
					data: payload,
				});

				console.log('Cliente salvo:', response.data);

				router.push('/dashboard/clients/index');
			} catch (err) {
				if (err instanceof AxiosError) {
					console.error(err.response?.data);
					// showSnackbar(
					// 	err.response?.data?.message ??
					// 		'Erro ao salvar cliente.',
					// 	'error'
					// );
				} else {
					console.error(err);
					setError('Erro inesperado.');
				}
			} finally {
				setLoading(false);
			}
		},
		[router]
	);

	const deleteClient = useCallback(
		async (id: number) => {
			setLoading(true);
			setError(null);

			try {
				await axiosInstance.delete(`/clients/${id}`);
				router.refresh();
			} catch (err) {
				if (err instanceof AxiosError) {
					console.error(err.response?.data);
					setError(
						err.response?.data?.message ??
							'Erro ao excluir cliente.'
					);
				} else {
					console.error(err);
					setError('Erro inesperado.');
				}
			} finally {
				setLoading(false);
			}
		},
		[router]
	);

	return {
		saveClient,
		deleteClient,
		loading,
		error,
	};
}
