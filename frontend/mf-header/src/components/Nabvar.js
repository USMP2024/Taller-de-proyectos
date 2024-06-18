// src/components/Nabvar.js
import React, {useEffect} from 'react';
import './Nabvar.css';

function Nabvar() {
  useEffect(() => {
    const dropdownButton = document.getElementById('dropdownMenuButton');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (dropdownButton && dropdownMenu) {
      dropdownButton.addEventListener('click', () => {
        dropdownMenu.classList.toggle('show');
      });
    }
  }, []);

  return (
    <header className="Nabvar">
      {/* Logo */}
      {/* <img src="logo.png" alt="IntiPachaArtes" /> */}
      <label className="tit">IntiPachaArtes</label>
      {/* Menu de navegación */}
      <nav className="nav">
      <div class="dropdown">
          <button class="dropdown-toggle" id="dropdownMenuButton">IMAGENES</button>
          <div class="dropdown-menu">
            <a href="#">Todas las imagenes</a>
            <a href="#">Fotos</a>
            <a href="#">Objetos en 3D</a>
            <a href="#">Vector</a>
            <a href="#">Ilustraciones</a>
            <a href="#">Generado por IA</a>
          </div>
      </div>
      <div class="dropdown">
          <button class="dropdown-toggle" id="dropdownMenuButton">VIDEOS</button>
      </div>
      <div class="dropdown">
          <button class="dropdown-toggle" id="dropdownMenuButton">EXPLORAR CONTENIDO</button>
      </div>
      </nav>
    </header>
  );
}

export default Nabvar;

