import React, { useState } from 'react';
import './RegistroArtista.css';
import backgroundImage from '../imagenes/campo.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Importamos Axios

const RegistroArtista = () => {
  // Definimos el estado "terminos" con valor inicial false
  const [terminos, setTerminos] = useState(false);

  // Definimos el estado "formData" como un objeto con las propiedades correspondientes a los campos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    nombreLegal: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Función para manejar el cambio de estado del checkbox de términos y condiciones
  const handleTerminosChange = () => {
    setTerminos(!terminos);
  };

  // Función para manejar los cambios en los campos de entrada del formulario
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenimos el comportamiento por defecto del formulario

    // Verificar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return; // Salir de la función si las contraseñas no coinciden
    }

    if (!terminos) {
      // Si no se han aceptado los términos y condiciones, mostramos una alerta
      alert('Debe aceptar los términos y condiciones para continuar');
    } else {
      try {
        // Enviar datos del formulario a la API utilizando Axios
        const response = await axios.post(
          'https://c5nft1fhh1.execute-api.us-east-1.amazonaws.com/Prod/Autenticacion/RegisterContribuidor',
          formData
        );
        console.log(response.data); // Manejar la respuesta de la API
      } catch (error) {
        console.error('Error al registrar el usuario:', error);
      }
    }
  };

  return (
    <div className="registro-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="registro-container">
        <h1>Únase a la comunidad y comience a realizar ventas en segundos.</h1>
        <form onSubmit={handleSubmit}>
          {/* Campo para ingresar nombre y apellidos */}
          <input
            type="text"
            placeholder="Introduzca su nombre y apellidos"
            name="nombre" // Asociamos el campo con la propiedad "nombre" del estado formData
            value={formData.nombre} // Establecemos el valor del campo con el valor correspondiente del estado formData
            onChange={handleInputChange} // Manejamos los cambios en este campo a través de la función handleInputChange
            required
          />
          <div className="nombre-artista-container">
            {/* Campo para ingresar el nombre legal */}
            <input
              type="text"
              placeholder="Indique su nombre legal"
              name="nombreLegal" // Asociamos el campo con la propiedad "nombreLegal" del estado formData
              value={formData.nombreLegal}
              onChange={handleInputChange}
              required
            />
            <small>Ej: El nombre que desea mostrar a los clientes</small>
          </div>
          {/* Campo para ingresar el correo electrónico */}
          <input
            type="email"
            placeholder="Ingresar Correo electrónico"
            name="email" // Asociamos el campo con la propiedad "email" del estado formData
            value={formData.email}
            onChange={handleInputChange}
            minLength={8}
            required
          />
          {/* Campo para ingresar la contraseña */}
          <input
            type="password"
            placeholder="Contraseña"
            name="password" // Asociamos el campo con la propiedad "password" del estado formData
            value={formData.password}
            onChange={handleInputChange}
            minLength={8}
            required
          />
          {/* Campo para confirmar la contraseña */}
          <input
            type="password"
            placeholder="Confirmar contraseña"
            name="confirmPassword" // Asociamos el campo con la propiedad "confirmPassword" del estado formData
            value={formData.confirmPassword}
            onChange={handleInputChange}
            minLength={8}
            required
          />
          <div className="terminos-container">
            {/* Checkbox de términos y condiciones */}
            <input
              type="checkbox"
              id="terminos"
              checked={terminos} // Asociamos el estado del checkbox con el estado "terminos"
              onChange={handleTerminosChange} // Manejamos los cambios en el checkbox a través de la función handleTerminosChange
              required
            />
            <label htmlFor="terminos" className="terminos-label">
              Certifico que tengo 18 o más años de edad y acepto las
              <span> Condiciones del servicio y la Política de privacidad</span>
            </label>
          </div>
          {/* Botón para enviar el formulario */}
          <button type="submit" className="ingresar-button">
            Registrarme
          </button>
        </form>
        <p>
          ¿Ya tiene una cuenta? <Link to="/LoginArtista">Ingresar</Link>
        </p>
      </div>
    </div>
  );
};

export default RegistroArtista;