import React, { useState } from 'react'
import './Barrabusqueda.css'

function Barrabusqueda() {
  const [query, setQuery] = useState('')

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
    
  const [barSize, setBarSize] = useState('normal');
  
    const handleChangeSize = (size) => {
      setBarSize(size);
    };

  return (
    <div className="search-bar-container">
    <input
      type="text"
      value={query}
      onChange={handleInputChange}
      className="search-input"
      placeholder="Buscar..."

    />
    </div>
  );
}

export default Barrabusqueda;