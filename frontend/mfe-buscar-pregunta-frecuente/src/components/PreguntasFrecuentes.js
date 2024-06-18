import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PreguntasFrecuentes.css';
import camara from '../imagenes/camara1.png';
import articulo1 from '../imagenes/vela.jpg';
import articulo2 from '../imagenes/flotador.jpg';
import articulo3 from '../imagenes/cartera1.jpg';
import articulo4 from '../imagenes/legal.jpg';
import ilustracion from '../imagenes/chica.JPG';

const PreguntasFrecuentes = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/preguntas-frecuentes');
        setData(response.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h1 className="titulo-busqueda">¿En qué podemos ayudarlo?</h1>
      <section className="seccion-busqueda">
        <div className="barra-busqueda">
          <img src={camara} alt="Cámara" className="icono-camara" />
          <input type="text" placeholder="Haga su pregunta o ingrese una palabra clave" />
          <button>Buscar</button>
        </div>
      </section>

      <section className="articulos-populares">
        <h2>Artículos populares</h2>
        <div className="columnas">
          <div className="columna">
            <h3>Comenzar</h3>
            <img src={articulo1} alt="Artículo 1" />
            <a href="https://support.submit.shutterstock.com/s/article/How-do-I-sign-up-to-become-a-Shutterstock-contributor?language=es">
              <p>¿Cómo me registro para convertirme en un colaborador de IntiPachaArtes?</p>
            </a>
            <a href="https://support.submit.shutterstock.com/s/article/How-can-I-change-the-name-in-my-account?language=es">
              <p>Preguntas frecuentes sobre el 1042-S</p>
            </a>
            <a href="https://support.submit.shutterstock.com/s/article/How-much-will-I-be-paid-as-a-contributor-to-Shutterstock?language=es">
              <p>¿Cómo puedo cambiar el nombre en mi cuenta?</p>
            </a>
            <a href="https://support.submit.shutterstock.com/s/article/Submission-and-Account-Guidelines?language=es">
              <p>Lineamientos para la cuenta de colaborador y el envío de contenido</p>
            </a>
            <a href="https://support.submit.shutterstock.com/s/article/How-do-I-get-paid-for-my-work?language=es">
              <p>¿Qué debo hacer para ganar dinero por mi trabajo?</p>
            </a>
          </div>
          <div className="columna">
            <h3>Revisión del contenido</h3>
            <img src={articulo2} alt="Artículo 2" />
            <a href="https://support.submit.shutterstock.com/s/article/What-are-the-technical-requirements-for-images?language=es">
              <p>¿Cuáles son los requisitos técnicos para las imágenes?</p>
            </a>
            <a href="https://support.submit.shutterstock.com/s/article/What-are-the-technical-requirements-for-footage?language=es">
              <p>¿Cuáles son los requisitos técnicos para los videos?</p>
            </a>
            <a href="https://support.submit.shutterstock.com/s/article/How-is-content-reviewed?language=es">
              <p>Descripción y mejores prácticas de palabras clave</p>
            </a>
            <a href="https://support.submit.shutterstock.com/s/article/Title-and-Keyword-Guidelines-Policies-and-Best-Practices?language=es">
              <p>¿Cómo se revisa el contenido?</p>
            </a>
            <a href="https://support.submit.shutterstock.com/s/article/Why-was-my-content-rejected-as-Non-Licensable-Content?language=es">
              <p>¿Por qué fue rechazado mi contenido como contenido no licenciable?</p>
            </a>
          </div>
          <div className="columna">
            <h3>Su cartera</h3>
            <img src={articulo3} alt="Artículo 3" />
            <a href="https://support.submit.shutterstock.com/s/article/Shutterstock-Data-Licensing-and-the-Contributor-Fund?language=es">
              <p>¿Cómo puedo enviar fotos para revisión?</p>
            </a>
            <a href="https://support.submit.shutterstock.com/s/article/How-do-I-submit-photos-for-review?language=es">
              <p>¿Cómo envío contenido editorial?</p>
            </a>
            <a href="https://support.submit.shutterstock.com/s/article/How-do-I-submit-editorial-content?language=es">
              <p>¿Cómo cargo contenido por medio de un FTPS?</p>
            </a>
            <a href="https://support.submit.shutterstock.com/s/article/How-do-I-upload-content-via-FTPS?language=es">
              <p>¿Cómo puedo enviar ilustraciones vectoriales para su revisión?</p>
            </a>
          </div>
          <div className="columna">
            <h3>Centro legal</h3>
            <img src={articulo4} alt="Artículo 4" />
            <a href="https://support.submit.shutterstock.com/s/article/Known-Restrictions-Architectural-Designs-and-Private-Land?language=es">
              <p>Restricciones conocidas: marcas comerciales y otra propiedad intelectual</p>
            </a>
            <a href="https://support.submit.shutterstock.com/s/article/Known-Restrictions-Trademarks-and-Other-Intellectual-Property?language=es">
              <p>Restricciones conocidas: diseños arquitectónicos y terrenos privados</p>
            </a>
            <a href="https://support.submit.shutterstock.com/s/article/Known-Restrictions-Artwork?language=es">
              <p>Restricciones conocidas: obras de arte</p>
            </a>
            <a href="https://support.submit.shutterstock.com/s/article/Known-Image-Restrictions-Events?language=es">
              <p>Restricciones conocidas: eventos</p>
            </a>
          </div>
        </div>
      </section>

      <section className="articulos-presentados">
        <h2>Artículos presentados</h2>
        <div className="contenido">
          <div className="enlaces">
            <h3>Estándares de publicación de contenido y actualizaciones de políticas</h3>
            <p>IntiPachaArtes está simplificando y ampliando nuestro enfoque para los envíos de contenido.</p>
            <h3>Lineamientos para la cuenta de colaborador y el envío de contenido</h3>
            <p>Regulaciones sobre cuentas y políticas importantes para los colaboradores de IntiPachaArtes.</p>
            <h3>¿Por qué se rechazó mi contenido para obtener un código QR?</h3>
            <p>Se encuentran prohibidos los diseños detallados de código QR, ya sean funcionales o inactivos.</p>
          </div>
          <div className="ilustracion">
            <img src={ilustracion} alt="Ilustración" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default PreguntasFrecuentes;