import React, { useEffect } from 'react';
import './PopUpPago.css';
import axios from 'axios';

const PopUpPago = () => {
  // Función para obtener los detalles del pago desde el endpoint
  const obtenerDetallesPago = async () => {
    try {
      const response = await axios.get('/api/pago/detalles'); // Reemplaza '/api/pago/detalles' con la URL del endpoint real
      // Aquí se maneja la respuesta del endpoint y se actualiza el estado o renderiza los detalles del pago
      console.log(response.data); // Imprimimos los datos recibidos en la consola
    } catch (error) {
      console.error('Error al obtener los detalles del pago:', error);
    }
  };

  // Llamamos a la función para obtener los detalles del pago al montar el componente
  useEffect(() => {
    obtenerDetallesPago();
  }, []);

  return (
    <div className="popup-container">
      <div className="popup-content">
        <div className="popup-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        <h2>¡PAGO REALIZADO CON ÉXITO!</h2>
        <p>Numero de Orden 00000004586</p>
        <div className="popup-buttons">
          <button className="volver-inicio">Volver al inicio</button>
          <button className="descargar-imagenes">Descargar imágenes</button>
        </div>
      </div>
    </div>
  );
};

export default PopUpPago;