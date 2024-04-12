// src/components/Cover.js
import React from 'react';
import './Cover.css'; // Importa el archivo CSS
import imagen from '../img/machupicchu.jpg'
function Cover() {
  const portadaStyles = {
    backgroundImage: `url(${imagen})`, // Establece la imagen como fondo
    backgroundSize: 'cover', // Ajusta el tamaño de la imagen al contenedor
    backgroundPosition: 'center', // Centra la imagen en el contenedor
    height: '800px', //* minHeight:'1000px', */ //Altura de la portada
    display: 'flex', // Para centrar el contenido verticalmente
    justifyContent: 'center', // Para centrar el contenido verticalmente
    alignItems: '10%', // Para alinear el contenido horizontalmente
    backgroundRepeat: 'no-repeat',
    position: 'relative'
  };
  return (
    <div style={portadaStyles}>
    <h1>Descubre la magia de Perú en cada compra</h1>
    </div>
  );
}

export default Cover;




