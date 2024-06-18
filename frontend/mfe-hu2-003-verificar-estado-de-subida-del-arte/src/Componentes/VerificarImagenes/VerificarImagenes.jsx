import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './verificarimagenes.css';
import axios from 'axios';

const VerificarImagenes = () => {
  const location = useLocation();
  const [imageStatuses, setImageStatuses] = useState([]);

  useEffect(() => {
    const fetchImageStatuses = async () => {
      try {
        const response = await axios.get('/VerificarImagenes.json'); // Cambia la URL según sea necesario
        setImageStatuses(response.data);
      } catch (error) {
        console.error('Error fetching image statuses:', error);
      }
    };

    fetchImageStatuses();
  }, []);

  return (
    <div className='contenido'>
      <div className='h1'>
        <br />
        <h1>Estado del Portafolio</h1>
      </div>

      <br />
      <div className="redirec">
        <div className='btns'>
          <button
            className={`Imagenes ${location.pathname === '/VerificarImagenes' ? 'selected' : ''}`}
          >
            Imagenes
          </button>
          {"   -   "}
          <Link to="/VerificarVideos">
            <button
              className={`Videos ${location.pathname === '/VerificarVideos' ? 'selected' : ''}`}
            >
              Videos
            </button>
          </Link>
        </div>

        <div className='estadoTable'>
          <table border={0} cellPadding={0} cellSpacing={0}>
            <thead>
              <tr>
                <th>Estado</th>
                <th>N. Estados</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>No se envió</td>
                <td>{imageStatuses.no_se_envio}</td>
              </tr>
              <tr>
                <td>Aprobación pendiente</td>
                <td>{imageStatuses.aprobacion_pendiente}</td>
              </tr>
              <tr>
                <td>Revisión reciente</td>
                <td>{imageStatuses.revision_reciente}</td>
              </tr>
              <tr>
                <td>------------------------</td>
                <td>----</td>
              </tr>
              <tr>
                <td>Cartera de Imagenes</td>
                <td>{imageStatuses.cartera}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VerificarImagenes;
