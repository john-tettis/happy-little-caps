
import { verifyToken } from './jwt';

export function authenticate(req) {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header
  console.log(token)
  if (!token) {
    throw new Error('No token provided');
  }

  // Verify the token
  try {
    const decoded = verifyToken(token);
    return decoded; // Return decoded payload (user info)
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
}
