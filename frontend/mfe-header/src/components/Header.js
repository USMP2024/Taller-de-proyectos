// src/components/Header.js
import React from 'react';
import Nabvar from './Nabvar';
import Login from './Login';
import './Header.css';

function Header() {
  return (
    <div className="HeaderTotal">
      <Nabvar />
      <Login />
    </div>
  );
}

export default Header;
