import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '..', '.env') });
dotenv.config({ path: join(__dirname, '..', '.env') });

const requiredEnvVars = ['JWT_SECRET', 'MONGODB_URI'];
const missingEnvVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingEnvVars.length > 0) {
  const msg = `Missing required environment variables: ${missingEnvVars.join(', ')}`;
  const isBuild =
    process.env.NEXT_PHASE === 'phase-production-build' ||
    process.env.npm_lifecycle_event === 'build';

  console.error(`❌ ${msg}`);
  if (!isBuild && !process.env.VERCEL && process.env.NODE_ENV !== 'test') {
    // Don't crash Next.js builds; fail on actual runtime requests instead
    if (process.env.SIGMORA_STRICT_ENV === '1') {
      process.exit(1);
    }
  }
} else {
  console.log('✅ Environment variables loaded');
}

export default process.env;
