import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  // Skip authentication for the public health endpoint
  if (request.nextUrl.pathname === '/api/health') {
    return NextResponse.next()
  }
  
  // Require authentication for ALL other API endpoints
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const session = await auth()
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*'
}
