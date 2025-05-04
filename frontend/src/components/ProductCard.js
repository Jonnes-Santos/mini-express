import React from 'react';
import { useCart } from '../contexts/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart, cartItems } = useCart();
  const itemInCart = cartItems.find(item => item.id === product.id);

  return (
    <div style={{
      border: '1px solid #ddd',
      padding: '15px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ marginTop: 0 }}>{product.name}</h3>
      <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
        R$ {product.price.toFixed(2)}
      </p>
      <button
        onClick={() => addToCart(product)}
        style={{
          padding: '10px 15px',
          backgroundColor: itemInCart ? '#2196F3' : '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          width: '100%'
        }}
      >
        {itemInCart ? `Adicionar mais (${itemInCart.quantity})` : 'Adicionar ao Carrinho'}
      </button>
    </div>
  );
};

export default ProductCard;