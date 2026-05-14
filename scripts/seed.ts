import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function seed() {
  console.log('🚀 Starting v2.0 Data Seeding...')

  const seedDataPath = path.join(process.cwd(), 'v2_seed_data.json')
  const seedData = JSON.parse(fs.readFileSync(seedDataPath, 'utf8'))

  const tables = Object.keys(seedData)

  for (const table of tables) {
    console.log(`\n📦 Seeding table: ${table}...`)
    
    const rows = seedData[table]
    
    // UPSERT logic: Use 'key' for site_config, 'page' for hero_sections, 'slug' for services, 'id' or other unique fields for others
    let onConflict = 'id'
    if (table === 'site_config') onConflict = 'key'
    if (table === 'hero_sections') onConflict = 'page'
    if (table === 'services') onConflict = 'slug'
    if (table === 'about_mission_vision') onConflict = 'type'

    const { error } = await supabase
      .from(table)
      .upsert(rows, { onConflict })

    if (error) {
      console.error(`❌ Error seeding ${table}:`, error.message)
    } else {
      console.log(`✅ Successfully seeded ${rows.length} rows in ${table}`)
    }
  }

  console.log('\n✨ Seeding completed successfully!')
}

seed().catch((err) => {
  console.error('💥 Fatal error during seeding:', err)
  process.exit(1)
})
