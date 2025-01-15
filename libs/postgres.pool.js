const { Pool } = require('pg');
const pool = new Pool({
  host: 'postgresql',
  port: 5432,
  user: 'postgres',
  password: 'ANDres1988',
  database: 'tienda',
});

module.exports = pool;
