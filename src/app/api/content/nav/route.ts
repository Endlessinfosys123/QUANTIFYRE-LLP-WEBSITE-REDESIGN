import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"

export async function GET() {
  try {
    const { data: navLinks, error: linksError } = await supabaseAdmin
      .from("nav_links")
      .select("*")
      .eq("is_visible", true)
      .order("position", { ascending: true })

    if (linksError) throw linksError

    const { data: settings, error: settingsError } = await supabaseAdmin
      .from("site_settings")
      .select("key, value")
      .in("key", ["nav_cta_text", "nav_cta_link", "nav_phone"])

    if (settingsError) throw settingsError

    const navSettings = settings.reduce((acc: any, item) => {
      acc[item.key] = item.value
      return acc
    }, {})

    return NextResponse.json({
      links: navLinks,
      settings: navSettings
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
