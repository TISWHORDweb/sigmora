import User from '../models/User.model.js';
import { ensureCreatorFreePackage } from './ensureCreatorFreePackage.js';

/**
 * Resolve the single platform publisher (Sigmora).
 * Prefers PLATFORM_CREATOR_EMAIL / PLATFORM_ACADEMY_CODE, else earliest creator.
 */
export async function getPlatformCreator() {
  const email = process.env['PLATFORM_CREATOR_EMAIL']?.trim().toLowerCase();
  if (email) {
    const byEmail = await User.findOne({ email, role: 'creator' });
    if (byEmail) return byEmail;
  }

  const code = process.env['PLATFORM_ACADEMY_CODE']?.trim().toUpperCase();
  if (code) {
    const byCode = await User.findOne({ academyCode: code, role: 'creator' });
    if (byCode) return byCode;
  }

  return User.findOne({ role: 'creator' }).sort({ createdAt: 1 });
}

/**
 * Ensure the platform creator from env exists and can sign in.
 * Creates admin@… if missing; keeps password in sync with PLATFORM_CREATOR_PASSWORD.
 */
export async function ensurePlatformCreator() {
  const email = process.env['PLATFORM_CREATOR_EMAIL']?.trim().toLowerCase();
  const password = process.env['PLATFORM_CREATOR_PASSWORD'];
  const name = process.env['PLATFORM_CREATOR_NAME']?.trim() || 'Sigmora';
  const academyCode = process.env['PLATFORM_ACADEMY_CODE']?.trim().toUpperCase() || undefined;

  if (email && password) {
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        password,
        role: 'creator',
        creatorName: name,
        ...(academyCode ? { academyCode } : {}),
      });
      await ensureCreatorFreePackage(user._id);
      return user;
    }

    let dirty = false;
    if (user.role !== 'creator') {
      user.role = 'creator';
      dirty = true;
    }
    if (!user.creatorName) {
      user.creatorName = name;
      dirty = true;
    }
    if (academyCode && !user.academyCode) {
      user.academyCode = academyCode;
      dirty = true;
    }

    // Keep desk login in sync with .env (so PLATFORM_CREATOR_PASSWORD always works)
    const matches = await user.comparePassword(password);
    if (!matches) {
      user.password = password;
      dirty = true;
    }

    if (dirty) await user.save();
    await ensureCreatorFreePackage(user._id);
    return user;
  }

  return getPlatformCreator();
}

let bootstrapPromise = null;

/** Run once per process after DB is up — creates/syncs PLATFORM_CREATOR_* account. */
export function bootstrapPlatformCreator() {
  if (!bootstrapPromise) {
    bootstrapPromise = ensurePlatformCreator().catch((err) => {
      bootstrapPromise = null;
      console.error('Platform creator bootstrap failed:', err.message);
      return null;
    });
  }
  return bootstrapPromise;
}
