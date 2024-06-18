import React, { useEffect, useState } from 'react';
import './CarritoCompra.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CarritoCompra = () => {
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState([]);

  const handleRevisarPedido = () => {
    navigate('/carritoDetalle');
  };

  // Función para obtener los datos del carrito desde el endpoint
  const obtenerDatosCarrito = async () => {
    try {
      const response = await axios.get('https://b8tz3ijhgg.execute-api.us-east-1.amazonaws.com/Prod/Usuarios/ObtenerDetalleCarrito?idUsuario=6');
      setCarrito(response.data); // Actualiza el estado con los datos del carrito
      localStorage.setItem('carrito', JSON.stringify(response.data)); // Guarda los datos en localStorage
    } catch (error) {
      console.error('Error al obtener los datos del carrito:', error);
    }
  };

  // Llamamos a la función para obtener los datos del carrito cuando el componente se monta
  useEffect(() => {
    obtenerDatosCarrito();
  }, []);

  return (
    <div className="carrito-compra-container">
      <div className="carrito-compra">
        <div className="carrito-compra-header">
          <img src="https://via.placeholder.com/30" alt="Imagen de perfil" />
          <span>Hola, Luis Navarro</span>
        </div>
        {carrito.map(item => (
          <div className="carrito-compra-item" key={item.idProducto}>
            <img src={item.urlImagenProducto} alt={`Imagen ${item.nombreProducto}`} />
            <div className="carrito-compra-item-info">
              <p>{item.idProducto}</p>
              <p>{item.formatoProducto}</p>
              <p>{item.descripcionProducto}</p>
              <div className="carrito-compra-actions">
                <p className="precio">${item.precioProducto}</p>
                <button className="eliminar-item">Eliminar</button>
              </div>
            </div>
          </div>
        ))}
        <div className="carrito-compra-total">
          <p>Total: ${carrito.reduce((acc, item) => acc + parseFloat(item.precioProducto), 0).toFixed(2)}</p>
        </div>
        <button className="revisar-pedido" onClick={handleRevisarPedido}>
          Revisar Pedido
        </button>
      </div>
    </div>
  );
};

export default CarritoCompra;
