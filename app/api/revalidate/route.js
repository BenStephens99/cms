import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
 
export async function GET(request) {
  const path = request.nextUrl.searchParams.get('path') || '/'
  revalidatePath('/')
  return NextResponse.json({ revalidated: true, now: Date.now() })
}