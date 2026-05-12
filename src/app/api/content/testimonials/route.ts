import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"

export async function GET() {
  try {
    const { data: testimonials, error } = await supabaseAdmin
      .from("testimonials")
      .select("*")
      .eq("is_visible", true)
      .order("position", { ascending: true })

    if (error) throw error

    return NextResponse.json(testimonials)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
