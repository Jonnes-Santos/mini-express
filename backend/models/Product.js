const pool = require('../config/db');

class Product {
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM products');
    return rows;
  }
}

module.exports = Product;