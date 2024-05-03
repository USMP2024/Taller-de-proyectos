// src/components/SearchBar.js
import React from 'react';
import './SearchBar.css';
/* import IconButton from '@mui/material/IconButton'; */

function SearchBar() {
  return (
    <section className="searchTotal">
      <input className="searchbar"></input>
      <div className="search-icon">
        {/* <IconButton><Icon>Buscar</Icon></IconButton> */}
      </div>
    </section>
  );
}

export default SearchBar;
