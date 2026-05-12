import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, admin_secret } = await req.json();

    // Basic validation
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Optional: Secret key to allow registration (to prevent public registration)
    // You can set this in your .env.local
    const expectedSecret = process.env.ADMIN_REGISTRATION_SECRET;
    if (expectedSecret && admin_secret !== expectedSecret) {
      return NextResponse.json({ error: "Invalid registration secret" }, { status: 403 });
    }

    // Check if user already exists
    const { data: existingUser } = await supabaseAdmin
      .from("admin_users")
      .select("id")
      .eq("email", email)
      .single();

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Insert user
    const { data: newUser, error } = await supabaseAdmin
      .from("admin_users")
      .insert({
        name,
        email,
        password_hash: hashedPassword,
        role: "admin",
        is_active: true
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "User registered successfully",
      user: { id: newUser.id, email: newUser.email, name: newUser.name }
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
