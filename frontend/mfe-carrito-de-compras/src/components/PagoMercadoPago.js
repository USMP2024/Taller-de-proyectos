import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PagoMercadoPago.css';
import mercadoPagoLogo from './mercado-pago-logo.jpg';

const PagoMercadoPago = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    // Validar si el campo de correo electrónico está vacío
    if (!emailValue.trim()) {
      setEmailError('Por favor, ingresa un correo electrónico.');
      return;
    }

    // Validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(emailValue)) {
      setEmailError('');
    } else {
      setEmailError('Por favor, ingresa un correo electrónico válido.');
    }
  };

  const handleContinuar = () => {
    // Verificar si el correo electrónico es válido y no está vacío
    if (!emailError && email.includes('@')) {
      // Redirigir a la vista DatosMercadoPago sin realizar solicitud al endpoint
      navigate('/DatosMercadoPago');
    }
  };

  const handleCrearCuenta = () => {
    // Redirigir al enlace https://www.mercadopago.com.mx/hub/registration?from_landing=true
    window.location.href = 'https://www.mercadopago.com.mx/hub/registration?from_landing=true';
  };

  return (
    <div className="pago-mercado-pago-container">
      <div className="pago-mercado-pago-header">
        <img src={mercadoPagoLogo} alt="Mercado Pago" className="pago-mercado-pago-logo" />
      </div>
      <div className="pago-mercado-pago-body">
        <h2>Ingresá tu e-mail, teléfono o usuario de Mercado Pago</h2>
        <div className="pago-mercado-pago-input-container">
          <input
            type="text"
            placeholder="E-mail, teléfono o usuario"
            value={email}
            onChange={handleEmailChange}
            className={emailError ? 'pago-mercado-pago-input-error' : ''}
          />
          {emailError && <span className="pago-mercado-pago-error">{emailError}</span>}
        </div>
        <div className="pago-mercado-pago-buttons">
          <button onClick={handleContinuar} className="pago-mercado-pago-continuar" disabled={!!emailError}>
            Continuar
          </button>
          <button onClick={handleCrearCuenta} className="pago-mercado-pago-crear-cuenta">Crear cuenta</button>
        </div>
        <div className="pago-mercado-pago-problems">
          <h3>Reportar un problema</h3>
          <button className="pago-mercado-pago-problem-button">
            <i className="fas fa-mobile-alt"></i>
            <span>Robo o pérdida de teléfono</span>
          </button>
          <button className="pago-mercado-pago-problem-button">
            <i className="fas fa-user-lock"></i>
            <span>Robo de cuenta</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PagoMercadoPago;
