import React from 'react';
import './componenteCabecera.css';

const ComponenteCabecera = () => {
  return (
    <div className="cabecera-contenedor">
      <h2>¿En qué podemos ayudarlo?</h2>
      <div>
        <input type="text" placeholder="Háganos una pregunta o ingrese una palabra clave" className="cabecera-input" />
        <button className="cabecera-boton">Buscar</button>
      </div>
    </div>
  );
};

export default ComponenteCabecera;