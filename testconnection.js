const { Client } = require('pg');

(async () => {
  const client = new Client({
    host: 'postgresql', // Cambia a 'postgresql' si estás en contenedores
    port: 5432,
    user: 'postgres',
    password: 'ANDres1988',
    database: 'tienda',
  });

  try {
    await client.connect();
    const result = await client.query('SELECT NOW()');
    console.log('Conexión exitosa:', result.rows[0]);
    await client.end();
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err);
  }
})();
