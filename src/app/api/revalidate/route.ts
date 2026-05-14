import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag, revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret') || request.headers.get('x-revalidate-secret')
  const tag = request.nextUrl.searchParams.get('tag')
  const path = request.nextUrl.searchParams.get('path')

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
      authorized = true;
    }
  }

  if (!authorized) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  if (!tag && !path) {
    return NextResponse.json({ message: 'Missing tag or path' }, { status: 400 })
  }

  try {
    if (tag) {
      // Next.js 16 requires a second argument for revalidateTag
      revalidateTag(tag, 'max')
    }
    
    if (path) {
      revalidatePath(path)
    }

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    console.error('Revalidation error:', err)
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
