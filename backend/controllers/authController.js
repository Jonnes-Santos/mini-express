const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../config/db');

// Método para validar CPF
exports.validateCpf = async (req, res) => {
  const { cpf } = req.body;
  
  try {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE cpf = $1', 
      [cpf.replace(/\D/g, '')]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ valid: false, message: 'CPF não cadastrado' });
    }
    
    res.json({ valid: true });
  } catch (error) {
    res.status(500).json({ error: 'Erro no servidor' });
  }
};

// Restante do seu código existente...
exports.generateQrCode = async (req, res) => {
  // ... código existente
};

exports.loginWithPassword = async (req, res) => {
  // ... código existente
};