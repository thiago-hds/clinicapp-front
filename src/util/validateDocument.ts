import { cpf, cnpj } from 'cpf-cnpj-validator';

export function validateCpf(value: string): boolean {
	return cpf.isValid(value);
}

export function validateCnpj(value: string): boolean {
	return cnpj.isValid(value);
}
