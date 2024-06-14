import React, { useEffect, useState } from 'react';
import './CarritoDetalle.css';
import { useNavigate } from 'react-router-dom';

const CarritoDetalle = () => {
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState([]);

  // Función que maneja la navegación al componente de Pago
  const handleCompletarPago = () => {
    navigate('/Pago');
  };

  // Función para obtener los detalles del carrito desde localStorage
  const obtenerDetallesCarrito = () => {
    const carritoStorage = localStorage.getItem('carrito');
    if (carritoStorage) {
      setCarrito(JSON.parse(carritoStorage));
    }
  };

  // Llamamos a la función para obtener los detalles del carrito cuando el componente se monta
  useEffect(() => {
    obtenerDetallesCarrito();
  }, []);

  return (
    <div className="carrito-detalle">
      {carrito.map(item => (
        <div className="carrito-item" key={item.idProducto}>
          <div className="item-imagen">
            <img src={item.urlImagenProducto} alt={`Imagen ${item.nombreProducto}`} />
          </div>
          <div className="item-detalles">
            <p>{item.idProducto}</p>
            <p>{item.formatoProducto}</p>
            <p>{item.descripcionProducto}</p>
          </div>
        </div>
      ))}
      <div className="resumen-pedido">
        <h3>Resumen del Pedido</h3>
        {carrito.map(item => (
          <div className="item-resumen" key={item.idProducto}>
            <img src={item.urlImagenProducto} alt={`Imagen ${item.nombreProducto}`} />
            <p>{item.nombreProducto}</p>
          </div>
        ))}
        <div className="compra-unica">
          <span>Compra Única</span>
          <span>${carrito.reduce((acc, item) => acc + parseFloat(item.precioProducto), 0).toFixed(2)}</span>
        </div>
        <button className="completar-pago" onClick={handleCompletarPago}>
          Completar Pago
        </button>
        <a href="#" className="seguir-comprando">Seguir Comprando</a>
      </div>
    </div>
  );
};

export default CarritoDetalle;
