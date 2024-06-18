// src/components/SearchImage.js
import React from 'react';
import './SeachImage.css';


function SearchImage() {
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    console.log(file);
    // Aquí puedes manejar el archivo seleccionado
  };

  return (
    <section>
      <label className="searchImage">
       <input type="file"  placeholder="Buscar por imagen" accept=".jpg,.png,.jpeg" onChange={handleFileSelect} style={{display: 'none'}} /> 
       Buscar por Imagen
       </label>
    </section>
  );
}

export default SearchImage;
