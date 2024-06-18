// src/components/SearchEngine.js
import React from 'react';
import './SearchEngines.css';

function SearchEngine() {
  return (
    <section className="">
      <div className="dropdown">
          <button className="dropdown-toggle engine">Todas las imagenes</button>
          <div className="dropdown-menu">
            <a href="#">Fotos</a>
            <a href="#">Objetos en 3D</a>
            <a href="#">Vector</a>
            <a href="#">Ilustraciones</a>
            <a href="#">Generado por IA</a>
          </div>
      </div>
    </section>
  );
}

export default SearchEngine;