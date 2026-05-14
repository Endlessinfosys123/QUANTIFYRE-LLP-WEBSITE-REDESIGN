import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret') || request.headers.get('x-revalidate-secret')
  const tag = request.nextUrl.searchParams.get('tag')

  let authorized = false;

  // Check 1: Secret Key (for external webhooks)
  if (secret && secret === process.env.REVALIDATION_SECRET) {
    authorized = true;
  }

  // Check 2: Supabase Session (for Admin Panel calls)
  if (!authorized) {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      // Basic check: is the user logged in? 
      // In a real scenario, check for 'admin' role in profiles table
      authorized = true;
    }
  }

  if (!authorized) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  if (!tag) {
    return NextResponse.json({ message: 'Missing tag' }, { status: 400 })
  }

  try {
    revalidateTag(tag)
    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
