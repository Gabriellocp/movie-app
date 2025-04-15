import { NextRequest, NextResponse } from 'next/server';

const privateRoutes = ['/movie']
const guestRoutes = ['/']
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const token = request.cookies.get('accessToken')?.value;
    if (!token && privateRoutes.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/', request.url))
    }
    if (token && guestRoutes.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/movie', request.url))
    }
    return NextResponse.next()
    // return NextResponse.redirect(new URL('/home', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
}