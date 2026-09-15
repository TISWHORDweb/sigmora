import jwt from 'jsonwebtoken';

// Generate JWT token with 5 hour expiration
export const generateToken = (id) => {
  const secret = process.env['JWT_SECRET'];
  if (!secret) {
    throw new Error('JWT_SECRET is required but not set in environment variables.');
  }
  return jwt.sign({ id }, secret, {
    expiresIn: '5h',
  });
};

// Generate refresh token (longer expiration for refresh)
export const generateRefreshToken = (id) => {
  const secret = process.env['JWT_REFRESH_SECRET'] || process.env['JWT_SECRET'];
  return jwt.sign({ id }, secret, {
    expiresIn: '7d',
  });
};

// Verify token and return decoded data
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env['JWT_SECRET']);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token expired');
    } else if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid token');
    }
    throw error;
  }
};
