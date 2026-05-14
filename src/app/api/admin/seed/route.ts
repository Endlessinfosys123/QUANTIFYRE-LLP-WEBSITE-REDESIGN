import { NextResponse } from 'next/server';
import { runSeed } from '@/lib/seed/runner';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  const logs: string[] = [];
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    logs.push("🔑 Authentication verified.");
    logs.push("🛰️ Starting upsert operation on 22 tables...");

    const results = await runSeed();
    
    Object.entries(results).forEach(([table, res]) => {
      if (res.status === 'success') {
        logs.push(`✅ Table [${table}] synchronized.`);
      } else {
        logs.push(`❌ Table [${table}] failed: ${res.message}`);
      }
    });

    const hasErrors = Object.values(results).some(r => r.status === 'error');

    if (hasErrors) {
      return NextResponse.json({ success: false, error: 'One or more tables failed to seed.', logs });
    }

    return NextResponse.json({ success: true, logs });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message, logs }, { status: 500 });
  }
}
