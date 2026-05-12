import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"

export async function GET() {
  try {
    const { data: settings, error } = await supabaseAdmin
      .from("site_settings")
      .select("key, value")

    if (error) throw error

    // Convert array of {key, value} to an object { [key]: value }
    const settingsObj = settings.reduce((acc: any, item) => {
      acc[item.key] = item.value
      return acc
    }, {})

    return NextResponse.json(settingsObj)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
