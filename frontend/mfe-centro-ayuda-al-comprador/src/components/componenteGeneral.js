import React, { useEffect } from 'react';
import axios from 'axios';
import './componenteGeneral.css';
import './componenteCabecera.css';
import './componenteTemasPopulares.css';
import './componenteNoEncuentra.css';
import ComponenteCabecera from './componenteCabecera';
import ComponenteTemasPopulares from './componenteTemasPopulares';
import ComponenteNoEncuentra from './componenteNoEncuentra';

const ComponenteGeneral = () => {
  useEffect(() => {
    // Configurar Axios
    axios.defaults.baseURL = 'https://tu-endpoint.com/api'; // Reemplaza con tu endpoint
    axios.defaults.headers.common['Authorization'] = 'Bearer TU_TOKEN'; // Si tu API requiere autenticación

    // Realizar solicitud HTTP con Axios
    axios.get('/datos')
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
    <div>
      <ComponenteCabecera />
      <ComponenteTemasPopulares />
      <ComponenteNoEncuentra />
    </div>
  );
};

export default ComponenteGeneral;