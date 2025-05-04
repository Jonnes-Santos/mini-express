import React from 'react';

const Checkout = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Checkout</h1>
      <div style={{ margin: '20px 0' }}>
        <p>Pagamento via PIX/Cartão</p>
        <button style={{ padding: '10px 20px', marginTop: '10px' }}>
          Confirmar Pagamento
        </button>
      </div>
    </div>
  );
};

export default Checkout;