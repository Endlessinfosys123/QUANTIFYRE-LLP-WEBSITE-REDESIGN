import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { supabaseAdmin } from "@/lib/supabase-admin"
import { revalidatePath, revalidateTag } from "next/cache"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { table, data, revalidate_path, revalidate_tag } = await req.json()

    const allowedTables = [
      "page_content", "site_settings", "services", "projects",
      "blog_posts", "testimonials", "faqs", "stats",
      "nav_links", "media", "contact_info", "seo_config", "page_sections"
    ]

    if (!allowedTables.includes(table)) {
      return NextResponse.json({ error: "Invalid table" }, { status: 400 })
    }

    // Ensure we have data to upsert
    if (!data) {
      return NextResponse.json({ error: "No data provided" }, { status: 400 })
    }

    const { error } = await supabaseAdmin
      .from(table)
      .upsert(data, { onConflict: 'id' in data ? 'id' : undefined })

    if (error) {
      console.error(`Supabase error (${table}):`, error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Handle revalidation
    if (revalidate_path) {
      revalidatePath(revalidate_path)
    }
    if (revalidate_tag) {
      revalidateTag(revalidate_tag)
    }

    return NextResponse.json({ 
      success: true, 
      timestamp: new Date().toISOString() 
    })
  } catch (error: any) {
    console.error("API Error (save-content):", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
