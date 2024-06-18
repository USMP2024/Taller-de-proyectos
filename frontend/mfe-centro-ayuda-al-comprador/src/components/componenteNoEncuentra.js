import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './componenteNoEncuentra.css';
import ComponenteBoton from './componenteBoton';

const ComponenteNoEncuentra = () => {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('');

  useEffect(() => {
    // Configurar Axios
    axios.defaults.baseURL = 'https://tu-endpoint.com/api'; // Reemplaza con tu endpoint
    axios.defaults.headers.common['Authorization'] = 'Bearer TU_TOKEN'; // Si tu API requiere autenticación

    // Realizar solicitud HTTP con Axios
    axios.get('/opciones-contacto')
      .then(response => {
        // Manejar la respuesta exitosa
        console.log(response.data);
      })
      .catch(error => {
        // Manejar el error
        console.error(error);
      });
  }, []);

  const manejarSeleccionOpcion = (opcion) => {
    setOpcionSeleccionada(opcion);
  };

  return (
    <div className="componente-no-encuentra">
      <h2>¿No encuentra lo que busca?</h2>
      <div className={`opcion-contacto ${opcionSeleccionada === 'chat' ? 'opcion-contacto-seleccionado' : ''}`}>
        <div className="mensaje-opcion">
          <p>Converse con nosotros</p>
          <span className="mensaje-difuminado">Estado: Disponible</span>
        </div>
        <ComponenteBoton
          texto="Seleccionar"
          seleccionado={opcionSeleccionada === 'chat'}
          onClick={() => manejarSeleccionOpcion('chat')}
        />
      </div>
      <div className={`opcion-contacto ${opcionSeleccionada === 'llamar' ? 'opcion-contacto-seleccionado' : ''}`}>
        <div className="mensaje-opcion">
          <p>Llámenos</p>
          <span className="mensaje-difuminado">Hable con un representante</span>
        </div>
        <ComponenteBoton
          texto="Seleccionar"
          seleccionado={opcionSeleccionada === 'llamar'}
          onClick={() => manejarSeleccionOpcion('llamar')}
        />
      </div>
      <div className={`opcion-contacto ${opcionSeleccionada === 'correo' ? 'opcion-contacto-seleccionado' : ''}`}>
        <div className="mensaje-opcion">
          <p>Envíenos un correo electrónico</p>
          <span className="mensaje-difuminado">Recibirás una respuesta en un día hábil</span>
        </div>
        <ComponenteBoton
          texto="Seleccionar"
          seleccionado={opcionSeleccionada === 'correo'}
          onClick={() => manejarSeleccionOpcion('correo')}
        />
      </div>
    </div>
  );
};

export default ComponenteNoEncuentra;