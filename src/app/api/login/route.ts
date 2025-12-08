import { axiosInstance } from '@/util/api';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	console.log('POST');
	const { email, password } = await req.json();

	console.log('email', email, 'password', password);

	try {
		const res = await axiosInstance.request({
			url: '/auth/login',
			method: 'POST',
			// headers: {
			// 	'Content-Type': 'application/x-www-form-urlencoded',
			// },
			data: {
				email: email,
				password: password,
			},
		});

		console.log('token', res);

		cookies().set('accessToken', res.data.token, {
			httpOnly: true,
			maxAge: 24 * 60 * 60,
		});

		return NextResponse.json({ teste: true });
		// cookies().set('refreshToken', resJson.refreshToken, {
		// 	httpOnly: true,
		// 	maxAge: 24 * 60 * 60,
		// });

		// console.log('response', response);
	} catch (e) {
		console.log('error', e);
		return NextResponse.json({
			success: false,
			message: 'Credential Error',
		});
	}
}
