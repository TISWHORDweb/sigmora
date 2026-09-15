import mongoose from 'mongoose';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

function readMongoUri() {
  // Bracket access avoids Next/webpack inlining `undefined` at build time
  // when the var was missing during `next build` on the host.
  const raw = process.env['MONGODB_URI'] || process.env['MONGO_URI'] || '';
  return String(raw).trim();
}

async function connectDB() {
  const uri = readMongoUri();
  if (!uri) {
    throw new Error(
      'MONGODB_URI is not defined. Set it in your host Environment Variables (Production + Preview), then redeploy.'
    );
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}

export default connectDB;
