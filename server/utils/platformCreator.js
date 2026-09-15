import User from '../models/User.model.js';
import { ensureCreatorFreePackage } from './ensureCreatorFreePackage.js';

/**
 * Resolve the single platform publisher (Sigmora).
 * Prefers PLATFORM_CREATOR_EMAIL / PLATFORM_ACADEMY_CODE, else earliest creator.
 */
export async function getPlatformCreator() {
  const email = process.env.PLATFORM_CREATOR_EMAIL?.trim().toLowerCase();
  if (email) {
    const byEmail = await User.findOne({ email, role: 'creator' });
    if (byEmail) return byEmail;
  }

  const code = process.env.PLATFORM_ACADEMY_CODE?.trim().toUpperCase();
  if (code) {
    const byCode = await User.findOne({ academyCode: code, role: 'creator' });
    if (byCode) return byCode;
  }

  return User.findOne({ role: 'creator' }).sort({ createdAt: 1 });
}

/**
 * Ensure a platform creator exists when bootstrap env vars are set.
 */
export async function ensurePlatformCreator() {
  const existing = await getPlatformCreator();
  if (existing) return existing;

  const email = process.env.PLATFORM_CREATOR_EMAIL?.trim().toLowerCase();
  const password = process.env.PLATFORM_CREATOR_PASSWORD;
  if (!email || !password) return null;

  const name = process.env.PLATFORM_CREATOR_NAME?.trim() || 'Sigmora';
  const academyCode = process.env.PLATFORM_ACADEMY_CODE?.trim().toUpperCase() || undefined;

  const creator = await User.create({
    name,
    email,
    password,
    role: 'creator',
    creatorName: name,
    ...(academyCode ? { academyCode } : {}),
  });

  await ensureCreatorFreePackage(creator._id);
  return creator;
}
