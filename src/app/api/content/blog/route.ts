import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get("slug")

    let query = supabaseAdmin
      .from("blog_posts")
      .select("*")
      .eq("status", "published")

    if (slug) {
      const { data: post, error } = await query.eq("slug", slug).single()
      if (error) throw error
      return NextResponse.json(post)
    } else {
      const { data: posts, error } = await query.order("published_at", { ascending: false })
      if (error) throw error
      return NextResponse.json(posts)
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
