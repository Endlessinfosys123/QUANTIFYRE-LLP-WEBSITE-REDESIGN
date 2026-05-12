import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const page = searchParams.get("page") || "homepage"

    const { data: faqs, error } = await supabaseAdmin
      .from("faqs")
      .select("*")
      .eq("is_visible", true)
      .eq("page", page)
      .order("position", { ascending: true })

    if (error) throw error

    return NextResponse.json(faqs)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
