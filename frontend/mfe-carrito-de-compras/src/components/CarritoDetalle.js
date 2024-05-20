import React from 'react';
import './CarritoDetalle.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CarritoDetalle = () => {
  const navigate = useNavigate();

  // Función que maneja la navegación al componente de Pago
  const handleCompletarPago = () => {
    navigate('/Pago');
  };

  // Función para obtener los detalles del carrito desde el endpoint
  const obtenerDetallesCarrito = async () => {
    try {
      const response = await axios.get('/api/carrito/detalles'); // Reemplaza '/api/carrito/detalles' con la URL del endpoint real
      // Aquí se maneja la respuesta del endpoint y se actualiza el estado o se renderiza los detalles del carrito
      console.log(response.data); // Imprimimos los datos recibidos en la consola
    } catch (error) {
      console.error('Error al obtener los detalles del carrito:', error);
    }
  };

  // Llamamos a la función para obtener los detalles del carrito
  obtenerDetallesCarrito();

  return (
    // Contenedor principal del componente
    <div className="carrito-detalle">
      {/* Sección del producto en el carrito */}
      <div className="carrito-item">
        {/* Imagen del producto */}
        <div className="item-imagen">
          <img src="https://via.placeholder.com/150" alt="Imagen del producto" />
        </div>
        {/* Detalles del producto */}
        <div className="item-detalles">
          <p>1085503217</p> {/* Código del producto */}
          <p>MP4</p> {/* Tipo de producto */}
          <p>Resolución HD 1080P</p> {/* Descripción del producto */}
        </div>
      </div>

      {/* Resumen del pedido */}
      <div className="resumen-pedido">
        <h3>Resumen del Pedido</h3>
        {/* Producto en el resumen */}
        <div className="item-resumen">
          <img src="https://via.placeholder.com/50" alt="Imagen del producto" />
          <p>1 Clip de video</p>
        </div>
        {/* Opción de compra única */}
        <div className="compra-unica">
          <span>Compra Única</span>
          <span>$50</span>
        </div>
        {/* Botón para completar el pago */}
        <button className="completar-pago" onClick={handleCompletarPago}>
          Completar Pago
        </button>
        {/* Enlace para seguir comprando */}
        <a href="#" className="seguir-comprando">Seguir Comprando</a>
      </div>
    </div>
  );
};

export default CarritoDetalle;