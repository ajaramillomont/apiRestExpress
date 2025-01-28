require('dotenv').config();

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DATABASE_URL,
  dbnName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
}

module.exports = { config };
