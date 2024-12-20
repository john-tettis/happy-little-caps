// lib/jwt.js

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Use an environment variable for the secret

// Function to generate a JWT token
export function generateToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
}

// Function to verify a JWT token
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET); // Verifies token and decodes the payload
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
}
