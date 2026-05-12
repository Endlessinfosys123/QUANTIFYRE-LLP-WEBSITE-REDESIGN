import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { supabaseAdmin } from "@/lib/supabase-admin"
import { revalidatePath } from "next/cache"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { table, id, revalidate_path } = await req.json()

    const allowedTables = [
      "services", "projects", "blog_posts", "testimonials", 
      "faqs", "stats", "nav_links", "media", "admin_users"
    ]

    if (!allowedTables.includes(table)) {
      return NextResponse.json({ error: "Invalid table" }, { status: 400 })
    }

    if (!id) {
      return NextResponse.json({ error: "No ID provided" }, { status: 400 })
    }

    // Special handling for media deletion (remove from storage too)
    if (table === "media") {
      const { data: mediaItem } = await supabaseAdmin
        .from("media")
        .select("filename")
        .eq("id", id)
        .single()

      if (mediaItem) {
        await supabaseAdmin.storage
          .from("quantifyre-media")
          .remove([`uploads/${mediaItem.filename}`])
      }
    }

    const { error } = await supabaseAdmin
      .from(table)
      .delete()
      .eq("id", id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (revalidate_path) {
      revalidatePath(revalidate_path)
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
