import React from 'react';
import './componenteCategoria.css';
import facturacion from './facturacion.png';
import licencias from './licencias.png';
import cuenta from './cuenta.jpg';
import asistencia from './asistencia.jpg';
import ComponenteArticulo from './componenteArticulo';

const ComponenteCategoria = () => {
  return (
    <div className="contenedor-categorias">
      <div className="componente-categoria">
        <h3>
          <span className="icono-contenido">
            <img src={facturacion} alt="Facturación" className="icono-facturacion" />
          </span>
          Facturación y pagos
        </h3>
        <ComponenteArticulo
          preguntas={[
            '¿Por qué no aceptan mi tarjeta?',
            '¿Cómo desactivo la renovación automática?',
            '¿Cómo obtengo un recibo?',
            '¿IntiPachaArtes cobra impuestos?',
          ]}
        />
      </div>
      <div className="componente-categoria">
        <h3>
          <span className="icono-contenido">
            <img src={licencias} alt="Licencias" className="icono-facturacion" />
          </span>
          Cómo elegir las licencias adecuadas
        </h3>
        <ComponenteArticulo
          preguntas={[
            '¿Cómo puedo usar contenido editorial?',
            'Uso de imágenes para logotipos y marcas comerciales',
            '¿La expresión "libre de regalías" implica que el contenido de IntiPachaArtes es gratuito?',
            '¿Qué es la licencia Premier de IntiPachaArtes?',
          ]}
        />
      </div>
      <div className="componente-categoria">
        <h3>
          <span className="icono-contenido">
            <img src={cuenta} alt="Cuenta" className="icono-facturacion" />
          </span>
          Cuenta
        </h3>
        <ComponenteArticulo
          preguntas={[
            '¿Cómo descargo imágenes?',
            '¿Cómo modifico la información de mi cuenta?',
            '¿Qué es IntiPachaArtes?',
            '¿Cómo cambio mi contraseña?',
          ]}
        />
      </div>
      <div className="componente-categoria">
        <h3>
          <span className="icono-contenido">
            <img src={asistencia} alt="Asistencia" className="icono-facturacion" />
          </span>
          Asistencia Técnica
        </h3>
        <ComponenteArticulo
          preguntas={[
            '¿Por qué no puedo iniciar sesión?',
            'Problemas relacionados con el sitio web y las descargas',
            '¿Dónde están los archivos que descargué en mi computadora?',
          ]}
        />
      </div>
    </div>
  );
};

export default ComponenteCategoria;