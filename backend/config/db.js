require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PG_USER || 'postgres',
  host: process.env.PG_HOST || 'localhost',
  database: process.env.PG_DATABASE || 'mini_express',
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT || 5432,
});

// Teste de conexão
pool.query('SELECT NOW()')
  .then(() => console.log('✅ PostgreSQL conectado'))
  .catch(err => console.error('Erro na conexão:', err));

module.exports = pool;