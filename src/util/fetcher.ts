import { axiosInstance } from './api';

export const fetcher = (url: string, params?: object) =>
	axiosInstance.get(url, { params: params ?? {} }).then(res => res.data);
