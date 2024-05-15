import React, { useState } from 'react';
import './LoginArtista.css';
import backgroundImage from '../imagenes/nevado.jpg';
import axios from 'axios'; // Importamos Axios

// Definimos el componente funcional LoginArtista
const LoginArtista = () => {
  const [email, setEmail] = useState(''); // Estado para el correo electrónico
  const [password, setPassword] = useState(''); // Estado para la contraseña

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitamos el comportamiento predeterminado del formulario

    try {
      // Enviamos una solicitud POST a la API de autenticación
      const response = await axios.post('/api/auth/login', {
        email,
        password,
      });

      // Si la autenticación es exitosa, puedes guardar el token u otros datos en el estado o en el almacenamiento local
      console.log(response.data);
    } catch (error) {
      // Si ocurre un error, puedes mostrar un mensaje de error al usuario
      console.error(error);
    }
  };

  // Renderizamos el JSX
  return (
    // Div principal con estilos de fondo utilizando la imagen importada
    <div className="login-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="login-container">
        <div className="form-container">
          {/* Título del formulario */}
          <h2>Ingresar</h2>

          {/* Formulario para el inicio de sesión */}
          <form onSubmit={handleSubmit}>
            {/* Campo de entrada para el correo electrónico */}
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Campo de entrada para la contraseña */}
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Botón de ingreso */}
            <button type="submit" className="login-button">
              Ingresar
            </button>
          </form>

          <div className="options">
            {/* Enlace para recuperar la contraseña */}
            <span>¿Olvidó su contraseña?</span>

            {/* Enlace para crear una nueva cuenta */}
            <a href="#">Crear una cuenta</a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Exportamos el componente LoginArtista
export default LoginArtista;