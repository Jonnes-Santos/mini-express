const app = require('./app');
const PORT = 3001; // Alterado para 3001

app.listen(PORT, () => {
  console.log(`✅ Backend rodando em http://localhost:${PORT}`);
});