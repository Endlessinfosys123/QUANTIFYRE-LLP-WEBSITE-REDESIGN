import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { revalidatePath, revalidateTag } from "next/cache"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { path, tag } = await req.json()

    if (path) {
      revalidatePath(path, 'page')
    }
    
    if (tag) {
      revalidateTag(tag, 'max')
    }

    return NextResponse.json({ 
      success: true, 
      revalidated: !!(path || tag),
      now: Date.now() 
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
