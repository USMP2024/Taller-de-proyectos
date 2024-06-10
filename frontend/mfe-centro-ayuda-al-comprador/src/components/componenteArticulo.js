import React from 'react';
import './componenteArticulo.css';

const ComponenteArticulo = ({ preguntas }) => {
  return (
    <div className="componente-articulo">
      {preguntas.map((pregunta, index) => (
        <button key={index} className="boton-pregunta">
          {pregunta}
        </button>
      ))}
    </div>
  );
};

export default ComponenteArticulo;