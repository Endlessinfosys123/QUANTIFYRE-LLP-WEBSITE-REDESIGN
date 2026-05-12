import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { supabaseAdmin } from "@/lib/supabase-admin"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Create unique filename
    const fileExt = file.name.split('.').pop()
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`
    const filePath = `uploads/${filename}`

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from("quantifyre-media")
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) {
      console.error("Supabase Storage Error:", uploadError)
      return NextResponse.json({ error: uploadError.message }, { status: 500 })
    }

    // Get public URL
    const { data: urlData } = supabaseAdmin.storage
      .from("quantifyre-media")
      .getPublicUrl(filePath)

    // Insert record into media table
    const { error: dbError } = await supabaseAdmin.from("media").insert({
      filename,
      original_name: file.name,
      url: urlData.publicUrl,
      file_type: file.type,
      file_size: file.size,
      uploaded_by: session.user?.email || "admin",
    })

    if (dbError) {
      console.error("Database Error (media):", dbError)
      // Note: We don't rollback storage upload here, but in production you might want to
      return NextResponse.json({ error: dbError.message }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      url: urlData.publicUrl,
      filename 
    })
  } catch (error: any) {
    console.error("API Error (upload-media):", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
