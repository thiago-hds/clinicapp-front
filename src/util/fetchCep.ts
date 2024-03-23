import axios from 'axios';

interface ViaCepResponse {
	cep: string;
	logradouro: string;
	complemento: string;
	bairro: string;
	localidade: string;
	uf: string;
	ibge: string;
	gia: string;
	ddd: string;
	siafi: string;
}

export default async function fetchCep(
	cep: string
): Promise<ViaCepResponse | null> {
	let cepFormatted = cep.replace(/\D/g, '');
	try {
		const resposta = await axios.get<ViaCepResponse>(
			`https://viacep.com.br/ws/${cepFormatted}/json/`
		);
		if (resposta.status != 200) {
			throw new Error();
		}
		return resposta.data;
	} catch (err) {
		return null;
	}
}
