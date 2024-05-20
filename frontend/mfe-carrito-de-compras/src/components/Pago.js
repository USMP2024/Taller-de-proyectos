import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Pago.css';
import paypalLogo from './paypal-logo.png';
import mercadoPagoLogo from './mercado-pago-logo.jpg';
import axios from 'axios';

const Pago = () => {
  const navigate = useNavigate();

  // Función para obtener los datos de pago desde el endpoint
  const obtenerDatosPago = async () => {
    try {
      const response = await axios.get('/api/pago'); // Reemplaza '/api/pago' con la URL del endpoint real
      // Aquí se maneja la respuesta del endpoint y se actualiza el estado o renderiza los detalles del pago
      console.log(response.data); // Imprimimos los datos recibidos en la consola
    } catch (error) {
      console.error('Error al obtener los datos de pago:', error);
    }
  };

  // Llamamos a la función para obtener los datos de pago
  obtenerDatosPago();

  const handlePagarConPayPal = () => {
    navigate('/PagoPaypal');
  };

  const handlePagarConMercadoPago = () => {
    navigate('/PagoMercadoPago');
  };

  return (
    <div className="pago-container">
      <h2>Selección del método de pago</h2>
      <div className="metodos-pago">
        <div className="metodo-pago">
          <img src={paypalLogo} alt="PayPal" />
          <button onClick={handlePagarConPayPal}>Pagar con PayPal</button>
        </div>
        <div className="metodo-pago">
          <img src={mercadoPagoLogo} alt="Mercado Pago" />
          <button onClick={handlePagarConMercadoPago}>Pagar con Mercado Pago</button>
        </div>
      </div>
    </div>
  );
};

export default Pago;