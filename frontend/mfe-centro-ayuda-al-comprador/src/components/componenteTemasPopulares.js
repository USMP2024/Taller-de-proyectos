import React, { useEffect } from 'react';
import axios from 'axios';
import './componenteTemasPopulares.css';
import ComponenteCategoria from './componenteCategoria';

const ComponenteTemasPopulares = () => {
  useEffect(() => {
    // Configurar Axios
    axios.defaults.baseURL = 'https://tu-endpoint.com/api'; // Reemplaza con tu endpoint
    axios.defaults.headers.common['Authorization'] = 'Bearer TU_TOKEN'; // Si tu API requiere autenticación

    // Realizar solicitud HTTP con Axios
    axios.get('/temas-populares')
      .then(response => {
        // Manejar la respuesta exitosa
        console.log(response.data);
      })
      .catch(error => {
        // Manejar el error
        console.error(error);
      });
  }, []);

  return (
    <div className="componente-temas-populares">
      <h2>Temas populares</h2>
      <ComponenteCategoria />
      {/* Agrega más instancias de ComponenteCategoria según sea necesario */}
    </div>
  );
};

export default ComponenteTemasPopulares;