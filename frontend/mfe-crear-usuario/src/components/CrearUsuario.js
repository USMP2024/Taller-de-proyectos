import React, { useState } from 'react';

const styles = {
  createUserSection: {
    width: '100%', /* 100% viewport width */
    backgroundColor: '#ffcc00', /* Yellow background */
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', /* Center content vertically */
    padding: '20px',
  },
  createUserForm: {
    backgroundColor: 'white', /* White form background */
    padding: '20px',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', /* Subtle shadow */
  },
  createUserLabel: {
    display:'block',
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#444', /* Darker text color */
  },
  createUserInput: {
    display:'block',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
    width: '100%', /* Full width input */
    height: '30px',
    marginBottom:'30px',
  },
  createUserButton: {
    backgroundColor: '#4CAF50', /* Green button */
    border: 'none',
    color: 'white',
    padding: '10px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '4px',
    marginTop: '10px', /* Margin top for spacing */
  },
};

export default function CrearUsuario() {
  const [usuario, setUsuario] = useState({
    nombre: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario(prevUsuario => ({
      ...prevUsuario,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Usuario a crear:', usuario);

    try {
      const response = await fetch('https://13qo8xtbe4.execute-api.us-east-1.amazonaws.com/Prod/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      });

      if (!response.ok) {
        throw new Error('Error en la petición: ' + response.statusText);
      }

      const data = await response.json();
      console.log('Respuesta de la API:', data);
      alert('Usuario creado con éxito! ID: ' + data.id);
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      alert('Error al crear el usuario. Ver consola para más detalles.');
    }
  };

  return (
    <section style={styles.createUserSection}>
      <h2>Crear Nuevo Usuario</h2>
      <form onSubmit={handleSubmit} style={styles.createUserForm}>
        <div>
          <label htmlFor="nombre" style={styles.createUserLabel}>
            Nombre:
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={usuario.nombre}
            onChange={handleChange}
            required
            style={styles.createUserInput}
          />
        </div>
        <div>
          <label htmlFor="email" style={styles.createUserLabel}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={usuario.email}
            onChange={handleChange}
            required
            style={styles.createUserInput}
          />
        </div>
        <button type="submit" style={styles.createUserButton}>
          Crear Usuario
        </button>
      </form>
    </section>
  );
}
