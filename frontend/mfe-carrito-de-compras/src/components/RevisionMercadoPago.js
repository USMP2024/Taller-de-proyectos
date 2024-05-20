import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DatosContext } from './DatosMercadoPago';
import visaLogo from './visa-logo.png';
import './RevisionMercadoPago.css';

const RevisionMercadoPago = () => {
  const navigate = useNavigate();
  const { tarjeta} = useContext(DatosContext);
  const [tarjetaMascarada, setTarjetaMascarada] = useState('');

  useEffect(() => {
    if (tarjeta) {
      const ultimosCuatroDigitos = tarjeta.slice(-4);
      setTarjetaMascarada(`Visa Débito terminada en ${ultimosCuatroDigitos}`);
    }
  }, [tarjeta]);

  const handleModificar = () => {
    navigate('/DatosMercadoPago');
  };

  const handlePagar = () => {
    navigate('/PopUpPago');
  };

  return (
    <div className="revision-mercado-pago-container">
      <h2>Revisa tu compra</h2>
      <div className="revision-mercado-pago-tarjeta">
        <div className="revision-mercado-pago-tarjeta-info">
          <img src={visaLogo} alt="Visa" />
          <span>{tarjetaMascarada}</span>
        </div>
        <button onClick={handleModificar}>Modificar</button>
      </div>
      <div className="revision-mercado-pago-detalle">
        <h3>Detalle de tu compra</h3>
        <p>1085503217</p>
        <p>$ 50</p>
      </div>
      <div className="revision-mercado-pago-total">
        <p>Pagas</p>
        <p>$ 50</p>
      </div>
      <button className="revision-mercado-pago-pagar" onClick={handlePagar}>
        Pagar
      </button>
      <p className="revision-mercado-pago-seguro">Pago seguro</p>
    </div>
  );
};

export default RevisionMercadoPago;