const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../config/db');

// Validação de CPF com regex melhorado
exports.validateCpf = async (req, res) => {
  const { cpf } = req.body;
  const cleanCpf = cpf.replace(/\D/g, '');

  if (cleanCpf.length !== 11 || !/^\d{11}$/.test(cleanCpf)) {
    return res.status(400).json({ error: "CPF inválido" });
  }

  try {
    const { rows } = await pool.query(
      'SELECT id FROM users WHERE cpf = $1', 
      [cleanCpf]
    );
    res.json({ valid: rows.length > 0 });
  } catch (error) {
    console.error('Erro na validação:', error);
    res.status(500).json({ error: "Erro no servidor" });
  }
};

// Login com tratamento melhorado
exports.loginWithPassword = async (req, res) => {
  const { cpf, password } = req.body;
  
  try {
    const { rows } = await pool.query(
      'SELECT id, password FROM users WHERE cpf = $1',
      [cpf.replace(/\D/g, '')]
    );

    if (!rows.length) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const user = rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    
    if (!validPassword) {
      return res.status(401).json({ error: "Senha inválida" });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: "Erro no servidor" });
  }
};