import React from 'react';
import './PagoPaypal.css';
import paypalLogo from './paypal-logo.png';
import skotiaLogo from './skotia-logo.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PagoPaypal = () => {
  const navigate = useNavigate(); // Obtener la función navigate de react-router-dom

  // Función que maneja la navegación al componente PopUpPago
  const handleCompletarCompra = () => {
    navigate('/PopUpPago');
  };

  // Función para obtener los datos de pago con PayPal desde el endpoint
  const obtenerDatosPagoPaypal = async () => {
    try {
      const response = await axios.get('/api/pago/paypal'); // Reemplaza '/api/pago/paypal' con la URL del endpoint real
      // Aquí se maneja la respuesta del endpoint y se actualiza el estado o renderiza los detalles del pago con PayPal
      console.log(response.data); // Imprimimos los datos recibidos en la consola
    } catch (error) {
      console.error('Error al obtener los datos de pago con PayPal:', error);
    }
  };

  // Llamamos a la función para obtener los datos de pago con PayPal
  obtenerDatosPagoPaypal();

  return (
    <div className="pago-paypal-container">
      {/* Encabezado con el logo de PayPal */}
      <div className="encabezado">
        <img src={paypalLogo} alt="PayPal" className="paypal-logo" /> 
        <span className="precio">$50 USD</span> 
      </div>

      {/* Información de envío */}
      <div className="envio">
        <h3>Enviar a Luis Navarro Carpio</h3>
        <p>Calle Los Sauces 783, LIMA, 15036, LIMA</p>
      </div>

      {/* Método de pago */}
      <div className="metodo-pago">
        <h3>Pagar con</h3>
        <div className="tarjeta">
          <img src={skotiaLogo} alt="skotia-logo" />
          <div>
            <p>Scotiabank Débito Clásica</p>
            <p>Cargo ****6460</p>
            <p>$52.05 USD</p>
          </div>
        </div>
        <label>
          <input type="checkbox" />
          Convertir en mi forma de pago preferida
        </label>
      </div>

      {/* Información adicional */}
      <div className="info-adicional">
        <p>Tasa de conversión de PayPal: 1 USD = 3.74 PEN</p>
        <a href="#">Ver opciones de divisas</a>
        <p>Le protegeremos de tarifas y precios cambiantes. Continue ahora para fijar esta tarifa y el precio durante 72 horas.</p>
        <a href="#">¿Por qué 72 horas?</a>
      </div>

      {/* Botón para completar la compra */}
      <button className="completar-compra" onClick={handleCompletarCompra}>
        Completar compra
      </button>

      {/* Información adicional */}
      <p className="info-adicional">
        Si carga fondos a su cuenta de PayPal antes de que se complete esta transacción, el saldo adicional se podrá utilizar para completar el pago.
      </p>
      <a href="#" className="cancelar">Cancelar y volver al IntiPachaArtes</a>
    </div>
  );
};

export default PagoPaypal;