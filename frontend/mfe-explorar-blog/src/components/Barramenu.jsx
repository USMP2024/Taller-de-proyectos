import React from 'react';
import './Barramenu.css'; // Archivo CSS para estilos

function Menu() {
  return (
    <div className="menu">
      <ul>
        <li><a href="#">EDITOR</a></li>
        <li><a href="#">DISEÑO</a></li>
        <li><a href="#">NEGOCIOS</a></li>
        <li><a href="#">COLABORADOR</a></li>
        <li><a href="#">PRODUCCION DE VIDEO</a></li>
        <li><a href="#">DESCARGAR GRATIS</a></li>
      </ul>
    </div>
  );
}

export default Menu;