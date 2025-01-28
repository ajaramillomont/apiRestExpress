require('dotenv').config();

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
}

module.exports = { config };
