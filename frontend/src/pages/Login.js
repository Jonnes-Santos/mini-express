// frontend/src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import QrCodeGenerator from '../components/QrCodeGenerator';

const Login = () => {
  const [mode, setMode] = useState('cpf'); // 'cpf', 'qrcode' ou 'register'
  const [formData, setFormData] = useState({
    cpf: '',
    password: '',
    name: '',
    email: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'register') {
        await api.post('/users/register', formData);
        alert('Cadastro realizado! Faça login.');
        setMode('cpf');
      } else {
        const response = await api.post(
          mode === 'cpf' ? '/auth/validate-cpf' : '/auth/login', 
          formData
        );
        if (response.data.valid) {
          localStorage.setItem('token', response.data.token);
          navigate('/products');
        }
      }
    } catch (error) {
      alert(error.response?.data?.error || 'Erro ao processar');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>
        {mode === 'register' ? 'Cadastro' : 'Acesso ao Mini Express'}
      </h1>

      {mode === 'qrcode' && formData.cpf && (
        <QrCodeGenerator cpf={formData.cpf} />
      )}

      <form onSubmit={handleSubmit}>
        {mode !== 'qrcode' && (
          <>
            <input
              type="text"
              placeholder="CPF"
              value={formData.cpf}
              onChange={(e) => setFormData({...formData, cpf: e.target.value})}
              required
            />
            
            {mode === 'register' && (
              <>
                <input
                  type="text"
                  placeholder="Nome completo"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
                <input
                  type="email"
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </>
            )}

            {(mode === 'login' || mode === 'register') && (
              <input
                type="password"
                placeholder="Senha"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            )}
          </>
        )}

        <button type="submit">
          {mode === 'register' ? 'Cadastrar' : 
           mode === 'qrcode' ? 'Voltar' : 'Entrar'}
        </button>
      </form>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        {mode === 'cpf' && (
          <>
            <button onClick={() => setMode('login')}>Login com Senha</button>
            <button onClick={() => setMode('qrcode')}>Acessar via QR Code</button>
            <button onClick={() => setMode('register')}>Cadastrar</button>
          </>
        )}
        {mode !== 'cpf' && (
          <button onClick={() => setMode('cpf')}>Voltar</button>
        )}
      </div>
    </div>
  );
};

export default Login;