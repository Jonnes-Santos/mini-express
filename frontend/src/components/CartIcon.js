import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const CartIcon = () => {
  const { cartCount } = useCart();
  
  return (
    <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <span style={{ fontSize: '24px' }}>🛒</span>
        {cartCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            backgroundColor: '#ff4444',
            color: 'white',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px'
          }}>
            {cartCount}
          </span>
        )}
      </div>
    </Link>
  );
};

export default CartIcon;