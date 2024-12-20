// lib/hashAdmin.js

import bcrypt from 'bcryptjs';
import knex from './knex.js'; // Make sure to import your knex setup

async function createAdmin() {
  const username = 'admin'; // Replace with your desired admin username
  const password = 'your-admin-password'; // Replace with your desired admin password
  const saltRounds = 10; // You can adjust the salt rounds based on security needs

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the admin user with the hashed password into the database
    const newAdmin = await knex('admin').insert({
      username,
      password: hashedPassword
    }).returning('*');

    console.log('Admin user created:', newAdmin);
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}

createAdmin()
