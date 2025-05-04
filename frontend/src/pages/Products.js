import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import ProductCard from '../components/ProductCard';
import CartIcon from '../components/CartIcon';
import api from '../services/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { cartCount } = useCart();

  useEffect(() => {
    api.get('/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Erro:', error));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h1>Produtos Disponíveis</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CartIcon />
          <span>{cartCount} itens no carrinho</span>
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '20px'
      }}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;