// frontend/src/components/QrCodeGenerator.js
import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import api from '../services/api';

const QrCodeGenerator = ({ cpf }) => {
  const [qrToken, setQrToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.post('/auth/generate-qrcode', { cpf })
      .then(response => {
        setQrToken(response.data.qrCode);
        setIsLoading(false);
      });
  }, [cpf]);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      {isLoading ? (
        <p>Gerando QR Code...</p>
      ) : (
        <>
          <QRCode 
            value={qrToken} 
            size={200} 
            level="H"
            includeMargin={true}
          />
          <p style={{ marginTop: '10px' }}>
            Escaneie com o app do Mini Express
          </p>
        </>
      )}
    </div>
  );
};

export default QrCodeGenerator;