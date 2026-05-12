import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"

export async function GET() {
  try {
    const { data: stats, error } = await supabaseAdmin
      .from("stats")
      .select("*")
      .eq("is_visible", true)
      .order("position", { ascending: true })

    if (error) throw error

    return NextResponse.json(stats)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
