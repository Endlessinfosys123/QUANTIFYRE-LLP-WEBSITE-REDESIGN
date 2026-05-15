import { createAdminClient } from '../supabase/server';
import { SEED_DATA } from './data';

export async function runSeed() {
  const supabase = await createAdminClient();
  const results: Record<string, { status: 'success' | 'error'; message?: string }> = {};

  const tables = Object.keys(SEED_DATA) as (keyof typeof SEED_DATA)[];

  for (const table of tables) {
    try {
      console.log(`Seeding table: ${table}...`);
      
      // UPSERT logic: if it has a 'key' (like site_config) or 'slug' or 'page' or 'type', use that as conflict target
      let conflictTarget = 'id';
      const t = table as string;
      if (t === 'site_config') conflictTarget = 'key';
      if (t === 'hero_sections') conflictTarget = 'page';
      if (t === 'services') conflictTarget = 'slug';
      if (t === 'about_mission_vision') conflictTarget = 'type';
      if (t === 'blog_posts') conflictTarget = 'slug';
      if (t === 'portfolio_projects') conflictTarget = 'slug';
      if (t === 'process_steps') conflictTarget = 'step_number';
      if (t === 'faqs') conflictTarget = 'question';
      if (t === 'tech_stack') conflictTarget = 'name';
      if (t === 'cta_sections') conflictTarget = 'page';
      if (t === 'contact_form_fields') conflictTarget = 'field_key';
      if (t === 'about_stats') conflictTarget = 'label';
      if (t === 'why_choose_us') conflictTarget = 'title';
      if (t === 'sister_brand') conflictTarget = 'brand_name';
      if (t === 'nav_items') conflictTarget = 'label';
      if (t === 'testimonials') conflictTarget = 'id';
      if (t === 'contact_form_config') conflictTarget = 'id';
      if (t === 'footer_links') conflictTarget = 'id';
      if (t === 'blog_page_config') conflictTarget = 'id';
      if (t === 'portfolio_page_config') conflictTarget = 'id';

      const { error } = await (supabase.from(table as any) as any)
        .upsert(SEED_DATA[table], { onConflict: conflictTarget });

      if (error) {
        console.error(`Error seeding ${table}:`, error);
        results[table] = { status: 'error', message: error.message };
      } else {
        results[table] = { status: 'success' };
      }
    } catch (err: any) {
      console.error(`Unexpected error seeding ${table}:`, err);
      results[table] = { status: 'error', message: err.message };
    }
  }

  return results;
}

export async function resetTable(table: string) {
  const supabase = await createAdminClient();
  
  // Wipe table
  const { error: deleteError } = await supabase.from(table).delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (deleteError) return { status: 'error', message: deleteError.message };

  // Re-seed if exists in SEED_DATA
  if (table in SEED_DATA) {
    const data = SEED_DATA[table as keyof typeof SEED_DATA];
    const { error: seedError } = await (supabase.from(table as any) as any).insert(data);
    if (seedError) return { status: 'error', message: seedError.message };
  }

  return { status: 'success' };
}
