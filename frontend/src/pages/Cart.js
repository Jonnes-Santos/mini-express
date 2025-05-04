import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, cartCount } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + (item.price * item.quantity), 0
  );

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <button 
        onClick={() => navigate('/products')}
        style={{
          padding: '8px 16px',
          marginBottom: '20px',
          backgroundColor: '#f5f5f5',
          border: '1px solid #ddd'
        }}
      >
        ← Continuar Comprando
      </button>

      <h1 style={{ marginBottom: '30px' }}>Seu Carrinho ({cartCount} itens)</h1>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ fontSize: '18px' }}>Seu carrinho está vazio</p>
          <button
            onClick={() => navigate('/products')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            Voltar às Compras
          </button>
        </div>
      ) : (
        <>
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '8px', 
            padding: '20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            {cartItems.map(item => (
              <div key={item.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #eee',
                padding: '15px 0'
              }}>
                <div style={{ flex: 2 }}>
                  <h3 style={{ margin: 0 }}>{item.name}</h3>
                  <p style={{ color: '#666' }}>{item.quantity} × R$ {item.price.toFixed(2)}</p>
                </div>
                <div style={{ flex: 1, textAlign: 'right' }}>
                  <p style={{ fontWeight: 'bold' }}>
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#ff4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginLeft: '15px'
                  }}
                >
                  Remover
                </button>
              </div>
            ))}
          </div>

          <div style={{ 
            marginTop: '30px',
            textAlign: 'right'
          }}>
            <h2>Total: R$ {total.toFixed(2)}</h2>
            <button
              onClick={() => navigate('/checkout')}
              style={{
                padding: '12px 24px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Finalizar Compra
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;