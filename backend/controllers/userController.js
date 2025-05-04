const pool = require('../config/db');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
  const { name, cpf, email, password, address, phone } = req.body;

  // Validação básica dos campos
  if (!name || !cpf || !email || !password) {
    return res.status(400).json({ 
      error: 'Nome, CPF, e-mail e senha são obrigatórios' 
    });
  }

  try {
    // Verifica se CPF/email já existe
    const userExists = await pool.query(
      `SELECT id FROM users WHERE cpf = $1 OR email = $2`,
      [cpf.replace(/\D/g, ''), email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ 
        error: 'CPF ou e-mail já cadastrado' 
      });
    }

    // Criptografa senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insere no banco
    const result = await pool.query(
      `INSERT INTO users 
       (name, cpf, email, password, address, phone) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [
        name,
        cpf.replace(/\D/g, ''),
        email,
        hashedPassword,
        address || null, // Permite valores nulos
        phone || null
      ]
    );

    res.status(201).json({ 
      success: true,
      userId: result.rows[0].id 
    });
  } catch (error) {
    console.error('Erro no cadastro:', error);
    res.status(500).json({ 
      error: 'Erro no servidor',
      details: error.message 
    });
  }
};