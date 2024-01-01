require('dotenv').config();
const path = require('path');

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.PG_HOST || '127.0.0.1',
      port: process.env.PG_PORT || 5432,
      user: process.env.PG_USER || 'postgres',
      password: process.env.PG_PASSWORD || '',
      database: process.env.PG_DATABASE || 'postgres',
    },
    migrations: {
      directory: path.join(__dirname, 'src', 'db', 'migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'src', 'db', 'seeds'),
    },
  },
  test: {
    client: 'pg',
    connection: {
      host: process.env.PG_HOST || '127.0.0.1',
      port: process.env.PG_PORT || 5432,
      user: process.env.PG_USER || 'postgres',
      password: process.env.PG_PASSWORD || '',
      database: process.env.PG_DATABASE || 'postgres',
    },
  },
};