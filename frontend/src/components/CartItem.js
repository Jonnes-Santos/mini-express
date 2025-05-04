import React from 'react';

const CartItem = ({ item, onRemove }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #eee',
      padding: '10px 0'
    }}>
      <div>
        <h4>{item.name}</h4>
        <p>R$ {item.price.toFixed(2)} x {item.quantity}</p>
      </div>
      <button 
        onClick={() => onRemove(item.id)}
        style={{
          padding: '5px 10px',
          backgroundColor: '#ff4444',
          color: 'white',
          border: 'none'
        }}
      >
        Remover
      </button>
    </div>
  );
};

export default CartItem;