import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// On Vercel/hosting, env comes from the dashboard — do not load a missing .env file.
const onHost = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);

if (!onHost) {
  dotenv.config({ path: join(__dirname, '..', '..', '.env') });
  dotenv.config({ path: join(__dirname, '..', '.env') });
}

const requiredEnvVars = ['JWT_SECRET', 'MONGODB_URI'];
const missingEnvVars = requiredEnvVars.filter((varName) => !String(process.env[varName] || '').trim());

if (missingEnvVars.length > 0) {
  const msg = `Missing required environment variables: ${missingEnvVars.join(', ')}`;
  const isBuild =
    process.env.NEXT_PHASE === 'phase-production-build' ||
    process.env.npm_lifecycle_event === 'build';

  console.error(`❌ ${msg}`);
  if (!isBuild && !process.env.VERCEL && process.env.NODE_ENV !== 'test') {
    if (process.env.SIGMORA_STRICT_ENV === '1') {
      process.exit(1);
    }
  }
} else if (!onHost) {
  console.log('✅ Environment variables loaded');
}

export default process.env;
