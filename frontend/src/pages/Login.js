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
    email: '',
    address: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (mode === 'register') {
        await api.post('/users/register', formData);
        alert('Cadastro realizado! Faça login.');
        setMode('cpf');
      } else if (mode === 'cpf') {
        const response = await api.post('/auth/validate-cpf', { cpf: formData.cpf });
        if (!response.data.valid) {
          setError('CPF não cadastrado');
          return;
        }
        setMode('login');
      } else if (mode === 'login') {
        const response = await api.post('/auth/login', {
          cpf: formData.cpf,
          password: formData.password
        });
        localStorage.setItem('token', response.data.token);
        navigate('/products');
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Erro ao processar');
    } finally {
      setIsLoading(false);
    }
  };

  // Estilos inline
  const styles = {
    container: {
      maxWidth: '400px',
      margin: '2rem auto',
      padding: '2rem',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      fontFamily: 'Arial, sans-serif'
    },
    title: {
      textAlign: 'center',
      color: '#2c3e50',
      marginBottom: '1.5rem'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    input: {
      padding: '0.75rem',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border-color 0.3s'
    },
    inputFocus: {
      borderColor: '#4CAF50'
    },
    button: {
      padding: '0.75rem',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s'
    },
    buttonHover: {
      backgroundColor: '#45a049'
    },
    buttonDisabled: {
      backgroundColor: '#cccccc',
      cursor: 'not-allowed'
    },
    switchContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      marginTop: '1.5rem'
    },
    switchButton: {
      padding: '0.5rem',
      background: 'none',
      border: 'none',
      color: '#4CAF50',
      cursor: 'pointer',
      fontSize: '0.9rem',
      textDecoration: 'none'
    },
    switchButtonHover: {
      textDecoration: 'underline'
    },
    error: {
      color: '#d32f2f',
      backgroundColor: '#fde8e8',
      padding: '0.75rem',
      borderRadius: '4px',
      textAlign: 'center',
      margin: '0.5rem 0'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        {mode === 'register' ? 'Cadastro' : 'Mini Express'}
      </h1>

      {mode === 'qrcode' && formData.cpf && (
        <QrCodeGenerator cpf={formData.cpf} />
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        {mode !== 'qrcode' && (
          <>
            <input
              type="text"
              placeholder="CPF"
              value={formData.cpf}
              onChange={(e) => setFormData({...formData, cpf: e.target.value})}
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
              onBlur={(e) => e.target.style.borderColor = styles.input.border}
              required
            />
            
            {mode === 'register' && (
              <>
                <input
                  type="text"
                  placeholder="Nome completo"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  style={styles.input}
                  onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
                  onBlur={(e) => e.target.style.borderColor = styles.input.border}
                  required
                />
                <input
                  type="email"
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  style={styles.input}
                  onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
                  onBlur={(e) => e.target.style.borderColor = styles.input.border}
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
                style={styles.input}
                onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
                onBlur={(e) => e.target.style.borderColor = styles.input.border}
                required
              />
            )}
          </>
        )}

        {error && <div style={styles.error}>{error}</div>}

        <button 
          type="submit" 
          style={{
            ...styles.button,
            ...(isLoading ? styles.buttonDisabled : {}),
          }}
          onMouseOver={(e) => !isLoading && (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => !isLoading && (e.target.style.backgroundColor = styles.button.backgroundColor)}
          disabled={isLoading}
        >
          {isLoading ? 'Processando...' : 
           mode === 'register' ? 'Cadastrar' : 
           mode === 'qrcode' ? 'Voltar' : 'Entrar'}
        </button>
      </form>

      <div style={styles.switchContainer}>
        {mode === 'cpf' && (
          <>
            <button 
              onClick={() => setMode('login')} 
              style={styles.switchButton}
              onMouseOver={(e) => e.target.style.textDecoration = styles.switchButtonHover.textDecoration}
              onMouseOut={(e) => e.target.style.textDecoration = styles.switchButton.textDecoration}
            >
              Login com Senha
            </button>
            <button 
              onClick={() => setMode('qrcode')} 
              style={styles.switchButton}
              onMouseOver={(e) => e.target.style.textDecoration = styles.switchButtonHover.textDecoration}
              onMouseOut={(e) => e.target.style.textDecoration = styles.switchButton.textDecoration}
            >
              Acessar via QR Code
            </button>
            <button 
              onClick={() => setMode('register')} 
              style={styles.switchButton}
              onMouseOver={(e) => e.target.style.textDecoration = styles.switchButtonHover.textDecoration}
              onMouseOut={(e) => e.target.style.textDecoration = styles.switchButton.textDecoration}
            >
              Cadastrar
            </button>
          </>
        )}
        {mode !== 'cpf' && (
          <button 
            onClick={() => setMode('cpf')} 
            style={styles.switchButton}
            onMouseOver={(e) => e.target.style.textDecoration = styles.switchButtonHover.textDecoration}
            onMouseOut={(e) => e.target.style.textDecoration = styles.switchButton.textDecoration}
          >
            Voltar
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;