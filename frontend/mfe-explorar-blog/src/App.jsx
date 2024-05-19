import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Barrabusqueda from './components/Barrabusqueda';
import Boton1 from './components/Boton1';
import Boton2 from './components/Boton2';
import Menu from './components/Menu'



function App() {
  return (
    <div>

      <h3 style={{ position:'absolute', top:90, left:'20%', transform:'translateX(-50)'}}><Boton1/></h3>
      <h3 style={{ position:'absolute', top:90, left:'55%', transform:'translateX(-50)'}}><Boton2/></h3>
      <h1 style={{ position:'absolute', top:0, left:'20%', transform:'translateX(-50)'}}><Barrabusqueda /></h1>
      <Menu/>

    </div>
  );
};

export default App;
