// pages/api/auth/login.js

import { generateToken } from '@/lib/jwt';
import bcrypt from 'bcryptjs';
import db from '@/lib/knex'; // Your Knex setup

export default async function handler(req:any, res:any) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      // Find user from the database
      const user = await db('admin').where('username', username).first();
      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      // Compare the password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      // Generate the JWT token
      const token = generateToken(user);
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
