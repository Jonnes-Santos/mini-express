const pool = require('../config/db');

exports.getAllProducts = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM products');
    // Garante que o preço é número
    const formattedProducts = rows.map(product => ({
      ...product,
      price: parseFloat(product.price)
    }));
    res.json(formattedProducts);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
};