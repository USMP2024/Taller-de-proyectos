import React, { useEffect, useState } from 'react';
import ListaUsuarios from './components/ListaUsuarios'; // Asegúrate de importar correctamente el componente ListaUsuarios

export default function Root(props) {
  // Estado para almacenar los usuarios
  const [usuarios, setUsuarios] = useState([]);

  // Efecto para cargar los datos de los usuarios
  useEffect(() => {
    // Función para cargar los datos de los usuarios
    const cargarUsuarios = async () => {
      try {
        const respuesta = await fetch('https://13qo8xtbe4.execute-api.us-east-1.amazonaws.com/Prod/users');
        const usuarios = await respuesta.json();
        setUsuarios(usuarios); // Actualiza el estado con los usuarios cargados
      } catch (error) {
        console.error('Error al cargar los datos de los usuarios:', error);
      }
    };

    cargarUsuarios(); // Llama a la función para cargar los usuarios
  }, []); // El array vacío asegura que el efecto se ejecute solo una vez, al montar el componente

  return (
    <section>
      <ListaUsuarios usuarios={usuarios} />
    </section>
  );
}