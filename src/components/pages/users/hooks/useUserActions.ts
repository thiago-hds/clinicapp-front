import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { UserFormData } from '../types/types';
import { axiosInstance } from '@/util/api';

export function useUserActions() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const saveUser = useCallback(
		async (formData: UserFormData, userId?: number) => {
			if (!formData) return;

			const editMode = userId != null;

			setLoading(true);
			setError(null);

			try {
				const method = editMode ? 'PATCH' : 'POST';
				const url = editMode ? `/users/${userId}` : '/users';

				const response = await axiosInstance.request({
					method,
					url,
					data: formData,
				});

				console.log('Usuário salvo:', response.data);

				router.push('/dashboard/users/index');
			} catch (err) {
				if (err instanceof AxiosError) {
					console.error(err.response?.data);
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

	const deleteUser = useCallback(
		async (id: number) => {
			setLoading(true);
			setError(null);

			try {
				await axiosInstance.delete(`/users/${id}`);
				router.refresh();
			} catch (err) {
				if (err instanceof AxiosError) {
					console.error(err.response?.data);
					setError(
						err.response?.data?.message ??
							'Erro ao excluir usuário.'
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
		saveUser,
		deleteUser,
		loading,
		error,
	};
}
