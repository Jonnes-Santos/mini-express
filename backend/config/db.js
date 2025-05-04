const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',       // Usuário padrão
  host: 'localhost',
  database: 'mini_express',
  password: '019856',  // A senha que você definiu na instalação
  port: 5432,
});

// Teste de conexão (adicione estas linhas)
pool.query('SELECT NOW()', (err, res) => {
  if (err) console.error('Erro ao conectar ao PostgreSQL:', err);
  else console.log('✅ PostgreSQL conectado em:', res.rows[0].now);
});

module.exports = pool;