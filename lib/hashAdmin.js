
import bcrypt from 'bcryptjs';
import db from './knex.js'; // Make sure to import your knex setup
// this is to seed the admin table with an admin. Useful for testing and when the app launcnes for the first time.
async function createAdmin() {
  const username = 'admin'; 
  const password = 'password'; 
  const saltRounds = 10; // You can adjust the salt rounds based on security needs

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the admin user with the hashed password into the database
    const newAdmin = await db('admin').insert({
      username,
      password: hashedPassword
    }).returning('*');

    console.log('Admin user created:', newAdmin);
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}

createAdmin()
