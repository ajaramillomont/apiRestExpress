require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER || 'postgres',
  dbPassword: process.env.DB_PASSWORD || 'ANDres1988',
  dbHost: process.env.DB_HOST || 'postgresql',
  dbnName: process.env.DB_NAME || 'tienda',
  dbPort: process.env.DB_PORT || '5432',
}

module.exports = { config };
