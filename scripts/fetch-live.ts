import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

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
  'blog_page_config', 'portfolio_page_config'
];

async function dumpTable(table: string) {
  const { data, error } = await supabase.from(table).select('*');
  if (error) {
    console.error(`❌ Error fetching ${table}:`, error.message);
    return [];
  }
  return data;
}

async function startSync() {
  console.log('🔄 [Fetch-Live] Intercepting data from Supabase...');
  
  const allData: any = {};
  
  for (const table of TABLES) {
    console.log(`📥 Fetching ${table}...`);
    allData[table] = await dumpTable(table);
  }

  const content = `// AUTOMATICALLY GENERATED SEED DATA - LAST SYNC: ${new Date().toLocaleString()}
// DO NOT MANUALLY EDIT UNLESS YOU KNOW WHAT YOU ARE DOING

export const SEED_DATA = ${JSON.stringify(allData, null, 2)};
`;

  const targetPath = path.resolve('src/lib/seed/data.ts');
  fs.writeFileSync(targetPath, content);
  
  console.log('\n✅ [Fetch-Live] Local data.ts has been updated with the latest website content!');
}

startSync();
