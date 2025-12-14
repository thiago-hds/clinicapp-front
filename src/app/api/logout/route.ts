import { axiosInstance } from '@/util/api';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	(await cookies()).set('accessToken', '', { maxAge: 0 });
	return NextResponse.json({ ok: true });
}
