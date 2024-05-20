import React, { useState, createContext } from 'react';
import axios from 'axios';
import './DatosMercadoPago.css';
import { useNavigate } from 'react-router-dom';

export const DatosContext = createContext({});

const DatosMercadoPago = () => {
  const history = useNavigate();
  const [tarjeta, setTarjeta] = useState('');
  const [tarjetaError, setTarjetaError] = useState('');
  const [titular, setTitular] = useState('');
  const [titularError, setTitularError] = useState('');
  const [vencimiento, setVencimiento] = useState('');
  const [vencimientoError, setVencimientoError] = useState('');
  const [codigoSeguridad, setCodigoSeguridad] = useState('');
  const [codigoSeguridadError, setCodigoSeguridadError] = useState('');

  const handleTarjetaChange = (e) => {
    const input = e.target.value.replace(/\D/g, ''); // Elimina todos los caracteres que no sean dígitos
    const formattedInput = input.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim(); // Inserta un espacio después de cada 4 dígitos
    setTarjeta(formattedInput);
    setTarjetaError('');

    if (input.length < 16) {
      setTarjetaError('La tarjeta debe tener al menos 16 dígitos.');
    }
  };

  const handleTitularChange = (e) => {
    const input = e.target.value.replace(/[^a-zA-Z\s]/g, ''); // Elimina todos los caracteres que no sean letras o espacios
    setTitular(input.toUpperCase());
    setTitularError('');

    if (!input) {
      setTitularError('Por favor, ingresa el nombre del titular.');
    }
  };

  const handleVencimientoChange = (e) => {
    const input = e.target.value.replace(/\D/g, ''); // Elimina todos los caracteres que no sean dígitos
    const formattedInput = input.replace(/^(\d{2})/, '$1/'); // Inserta '/' después de los primeros 2 dígitos (mes)
    setVencimiento(formattedInput);
    setVencimientoError('');

    if (!input) {
      setVencimientoError('Por favor, ingresa la fecha de vencimiento.');
    }
  };

  const handleCodigoSeguridadChange = (e) => {
    const input = e.target.value.replace(/\D/g, ''); // Elimina todos los caracteres que no sean dígitos
    setCodigoSeguridad(input);
    setCodigoSeguridadError('');

    if (input.length !== 3) {
      setCodigoSeguridadError('El código de seguridad debe tener 3 dígitos.');
    }
  };

  const handleContinuar = async () => {
    // Validaciones adicionales si es necesario
    // ...

    // Si no hay errores, proceder
    if (!tarjetaError && !titularError && !vencimientoError && !codigoSeguridadError) {
      try {
        const response = await axios.post('/api/mercado-pago/procesar-pago', {
          tarjeta,
          titular,
          vencimiento,
          codigoSeguridad,
        });
        console.log(response.data);
        // Después de procesar el pago correctamente, navega a la vista RevisionMercadoPago
        history.navigate('/RevisionMercadoPago');
      } catch (error) {
        console.error('Error al procesar el pago:', error);
      }
    }
  };

  const handleVolver = () => {
    // Regresar a la vista PagoMercadoPago
    history('/PagoMercadoPago');
  };

  return (
    <DatosContext.Provider value={{ tarjeta, titular, vencimiento, codigoSeguridad }}>
      <div className="datos-mercado-pago-container">
        <h2>Completa los datos de tu tarjeta</h2>
        <p>
          Activa las compras por internet en la app de tu banco o llamando al teléfono que está en la tarjeta.
        </p>
        <div className="datos-mercado-pago-form">
          <div className="datos-mercado-pago-field">
            <label htmlFor="tarjeta">Número de tarjeta</label>
            <input
              type="text"
              id="tarjeta"
              value={tarjeta}
              onChange={handleTarjetaChange}
            />
            {tarjetaError && <span className="datos-mercado-pago-error">{tarjetaError}</span>}
          </div>
          <div className="datos-mercado-pago-field">
            <label htmlFor="titular">Nombre del titular</label>
            <input
              type="text"
              id="titular"
              value={titular}
              onChange={handleTitularChange}
            />
            {titularError && <span className="datos-mercado-pago-error">{titularError}</span>}
          </div>
          <div className="datos-mercado-pago-field">
            <label htmlFor="vencimiento">Vencimiento</label>
            <input
              type="text"
              id="vencimiento"
              value={vencimiento}
              onChange={handleVencimientoChange}
            />
            {vencimientoError && <span className="datos-mercado-pago-error">{vencimientoError}</span>}
          </div>
          <div className="datos-mercado-pago-field">
            <label htmlFor="codigoSeguridad">Código de seguridad</label>
            <input
              type="text"
              id="codigoSeguridad"
              value={codigoSeguridad}
              onChange={handleCodigoSeguridadChange}
            />
            {codigoSeguridadError && <span className="datos-mercado-pago-error">{codigoSeguridadError}</span>}
          </div>
        </div>
        <div className="datos-mercado-pago-detalle">
          <h3>Detalle de tu compra</h3>
          <p>1085503217</p>
          <p>MP4</p>
          <p>Resolución HD 1080p</p>
          <p>$ 50</p>
        </div>
        <div className="datos-mercado-pago-buttons">
          <button className="datos-mercado-pago-volver" onClick={handleVolver}>
            Volver
          </button>
          <button className="datos-mercado-pago-continuar" onClick={handleContinuar}>
            Continuar
          </button>
        </div>
      </div>
    </DatosContext.Provider>
  );
};

export default DatosMercadoPago;
