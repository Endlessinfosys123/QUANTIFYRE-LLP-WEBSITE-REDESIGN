import { createClient } from '@supabase/supabase-js';
import { watch } from 'chokidar';
import { runSeed } from '../src/lib/seed/runner';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const DATA_FILE = path.resolve('src/lib/seed/data.ts');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const TABLES = [
  'site_config', 'nav_items', 'hero_sections', 'cta_sections', 
  'services', 'portfolio_projects', 'blog_posts', 'faqs', 
  'testimonials', 'about_stats', 'why_choose_us', 'process_steps', 
  'about_mission_vision', 'tech_stack', 'sister_brand', 'footer_links',
  'blog_page_config', 'portfolio_page_config',
  'contact_form_config', 'contact_form_fields'
];

let isInternalUpdate = false;

// --- 1. FUNCTION: FETCH FROM DB TO FILE ---
async function syncDbToFile() {
  if (isInternalUpdate) return;
  
  console.log('🔄 [Live-Sync] CMS Change detected! Updating local data.ts...');
  
  const allData: any = {};
  for (const table of TABLES) {
    const { data } = await supabase.from(table).select('*');
    allData[table] = data || [];
  }

  const content = `// AUTOMATICALLY GENERATED SEED DATA - LAST SYNC: ${new Date().toLocaleString()}
export const SEED_DATA = ${JSON.stringify(allData, null, 2)};
`;

  isInternalUpdate = true;
  fs.writeFileSync(DATA_FILE, content);
  setTimeout(() => { isInternalUpdate = false; }, 1000);
  
  console.log('✅ [Live-Sync] Local data.ts mirrored with Cloud DB.');
}

// --- 2. FUNCTION: PUSH FROM FILE TO DB ---
async function syncFileToDb() {
  if (isInternalUpdate) return;

  console.log('🚀 [Live-Sync] Local file change detected! Syncing to Supabase...');
  
  isInternalUpdate = true;
  try {
    await runSeed();
    console.log('✅ [Live-Sync] Cloud DB updated from local changes.');
  } catch (err: any) {
    console.error('❌ [Live-Sync] Sync failed:', err.message);
  } finally {
    setTimeout(() => { isInternalUpdate = false; }, 1000);
  }
}

// --- 3. EXECUTION: START WATCHERS ---
console.log('🛰️  [Live-Sync] Starting Bidirectional Mirror Service...');

// A. Watch local file
const watcher = watch(DATA_FILE, { persistent: true });
watcher.on('change', syncFileToDb);

// B. Watch Supabase Realtime
const channel = supabase
  .channel('db-changes')
  .on('postgres_changes', { event: '*', schema: 'public' }, (payload) => {
    // Only sync if the table is in our list
    if (TABLES.includes(payload.table)) {
      syncDbToFile();
    }
  })
  .subscribe((status) => {
    if (status === 'SUBSCRIBED') {
      console.log('📡 [Live-Sync] Realtime Subscription Active (Listening to CMS)');
    }
  });

process.on('SIGINT', () => {
  watcher.close();
  supabase.removeChannel(channel);
  process.exit(0);
});
