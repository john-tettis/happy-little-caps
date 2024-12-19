import knex from 'knex';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Define Knex configuration
const db = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL || {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 5432, // default PostgreSQL port
  },
});
  
export default db;
