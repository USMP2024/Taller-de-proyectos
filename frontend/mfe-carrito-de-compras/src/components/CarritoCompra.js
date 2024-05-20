import React from 'react';
import './CarritoCompra.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CarritoCompra = () => {
  const navigate = useNavigate();

  const handleRevisarPedido = () => {
    navigate('/carritoDetalle');
  };

  // Función para obtener los datos del carrito desde el endpoint
  const obtenerDatosCarrito = async () => {
    try {
      const response = await axios.get('/api/carrito'); // Reemplaza '/api/carrito' con la URL del endpoint real
      // Aquí se maneja la respuesta del endpoint y se actualiza el estado o se renderiza el carrito
      console.log(response.data); // Imprimimos los datos recibidos en la consola
    } catch (error) {
      console.error('Error al obtener los datos del carrito:', error);
    }
  };

  // Llamamos a la función para obtener los datos del carrito
  obtenerDatosCarrito();

  return (
    // Contenedor principal del componente
    <div className="carrito-compra-container">
      <div className="carrito-compra">
        {/* Encabezado del carrito de compra */}
        <div className="carrito-compra-header">
          <img src="https://via.placeholder.com/30" alt="Imagen de perfil" /> {/* Imagen de perfil del usuario */}
          <span>Hola, Luis Navarro</span> {/* Saludo con el nombre del usuario */}
        </div>

        {/* Elemento del carrito de compra */}
        <div className="carrito-compra-item">
          <img src="https://via.placeholder.com/150" alt="Imagen 1" /> {/* Imagen del producto */}
          <div className="carrito-compra-item-info">
            <p>1085503217</p> {/* Código del producto */}
            <p>MP4</p> {/* Tipo de producto */}
            <p>Resolución HD 1080P</p> {/* Descripción del producto */}
            {/* Acciones para el producto */}
            <div className="carrito-compra-actions">
              <p className="precio">$50</p> {/* Precio del producto */}
              <button className="eliminar-item">Eliminar</button> {/* Botón para eliminar el producto del carrito */}
            </div>
          </div>
        </div>

        {/* Sección de video recomendado */}
        <div className="video-recomendado">Video Recomendado</div>

        {/* Otro elemento del carrito de compra */}
        <div className="carrito-compra-item">
          <img src="https://via.placeholder.com/150" alt="Imagen 2" /> {/* Imagen del producto */}
          <div className="carrito-compra-item-info">
            <p>1085503220</p> {/* Código del producto */}
            <p className="precio">$50</p> {/* Precio del producto */}
            <button className="anadir-carrito">Añadir al carrito</button> {/* Botón para añadir el producto al carrito */}
          </div>
        </div>

        {/* Total del carrito de compra */}
        <div className="carrito-compra-total">
          <p>Total: $50</p>
        </div>

        <button className="revisar-pedido" onClick={handleRevisarPedido}>
          Revisar Pedido
        </button> {/* Botón para revisar el pedido */}
      </div>
    </div>
  );
};

export default CarritoCompra;