const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local manually
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) env[key.trim()] = value.trim().replace(/^["']|["']$/g, '');
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not found in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fixDatabase() {
  console.log('Connecting to Supabase...');
  
  // Note: We can't run raw SQL easily via the JS client unless we use a RPC or the database is set up for it.
  // However, we can try to "upsert" or "select" to check existence, but adding columns requires SQL.
  
  console.log('\n--- IMPORTANT INSTRUCTION ---');
  console.log('The Supabase JS client cannot run "ALTER TABLE" commands directly for security reasons.');
  console.log('Please copy and paste the following SQL into your Supabase SQL Editor (https://app.supabase.com):');
  console.log('\nALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;');
  console.log('ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS role TEXT DEFAULT \'admin\';');
  console.log('ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS name TEXT NOT NULL DEFAULT \'Admin User\';');
  console.log('\n-----------------------------\n');
}

fixDatabase();
