import dotenv from "dotenv"
dotenv.config()
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default  {

  development: {
    client: 'postgresql',
    connection: {
      database: 'happy-little-caps-dev',
      user:     process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations'
    }
    
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'happy-little-caps',
      user:     process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
