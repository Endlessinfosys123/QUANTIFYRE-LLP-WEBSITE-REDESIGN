import { watch } from 'chokidar';
import { runSeed } from './src/lib/seed/runner';
import { resolve } from 'path';

const DATA_FILE = resolve('src/lib/seed/data.ts');

console.log('🚀 [Auto-Seed] Monitoring for changes in:', DATA_FILE);

const watcher = watch(DATA_FILE, {
  persistent: true,
  ignoreInitial: false
});

let isSeeding = false;

watcher.on('change', async (path) => {
  if (isSeeding) return;
  
  console.log(`\n📄 [Auto-Seed] Change detected in ${path}`);
  console.log('⏳ Triggering Database Sync...');
  
  isSeeding = true;
  try {
    const results = await runSeed();
    const successCount = Object.values(results).filter((r: any) => r.status === 'success').length;
    console.log(`✅ [Auto-Seed] Sync Complete! (${successCount} tables updated)`);
  } catch (err: any) {
    console.error('❌ [Auto-Seed] Sync Failed:', err.message);
  } finally {
    isSeeding = false;
  }
});

process.on('SIGINT', () => {
  watcher.close();
  process.exit(0);
});
