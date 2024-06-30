import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	if (request.nextUrl.pathname.startsWith('/dashboard')) {
		const accessToken = request.cookies.get('accessToken');
		console.log('dentro do middleware', accessToken);

		if (!accessToken) {
			console.log('sem access token');
			const response = NextResponse.redirect(
				new URL('/auth/login', request.url)
			);
			response.cookies.delete('refreshToken');
			return response;
		}
	}

	return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: '/dashboard/:path*',
};
