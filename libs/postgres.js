const { Client } = require('pg');

async function getConnection() {
  const client = new Client({
    host: 'postgresql',
    port: 5432,
    user: 'postgres',
    password: 'ANDres1988',
    database: 'tienda',
  });

  await client.connect();

  return client;
}

module.exports = getConnection;
