import ClientIndexPage from '@/components/pages/clients/ClientIndexPage';
import { fetcher } from '@/util/fetcher';

export default async function Page() {
	const initialParams = {
		page: 1,
		take: 10,
		query: '',
		orderBy: 'createdAt',
		order: 'desc' as Order,
	};

	const initialData = await fetcher('/clients', initialParams);

	console.log('initialData', initialData);

	return (
		<ClientIndexPage
			fallbackData={initialData}
			initialParams={initialParams}
		/>
	);
}
