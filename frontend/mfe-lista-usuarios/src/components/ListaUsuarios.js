import React from 'react';

function ListaUsuarios({ usuarios }) {
  // Estilos en línea para la tabla y sus componentes
  const styles = {
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    btn: {
      marginBottom: '10px',
      backgroundColor: '#FFD700', // Un tono de amarillo vibrante
      color: '#4A4E69', // Un azul oscuro/gris para el texto, que ofrece buen contraste
      fontSize: '16px', // Tamaño de la fuente
      fontWeight: 'bold', // Negrita para que el texto resalte
      padding: '10px 20px', // Espaciado interno para hacer el botón más grande y fácil de clickear
      border: 'none', // Sin borde para un diseño más limpio
      borderRadius: '5px', // Bordes redondeados suavemente
      cursor: 'pointer', // Cambiar el cursor a pointer para indicar que es clickeable
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)', // Sombra sutil para darle profundidad
      transition: 'all 0.3s ease', // Transición suave para efectos de hover y focus
    },
    th: {
      background: '#DDB700', // Color de fondo para los encabezados de la tabla
      color: '#FFFFFF', // Color de texto para los encabezados
      padding: '10px',
      fontSize: '18px',
    },
    td: {
      border: '1px solid #DDD', // Borde de las celdas
      padding: '10px',
      fontSize: '16px',
      color: '#333333', // Color de texto para el contenido
    },
    tr: {
      '&:nth-child(even)': {
        backgroundColor: '#F0F0F0', // Color de fondo para las filas pares
      },
    },
  };

  return (
    <>
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>ID</th>
          <th style={styles.th}>Nombre</th>
          <th style={styles.th}>Email</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((usuario) => (
          <tr key={usuario.id} style={styles.tr}>
            <td style={styles.td}>{usuario.id}</td>
            <td style={styles.td}>{usuario.nombre}</td>
            <td style={styles.td}>{usuario.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
}

export default ListaUsuarios;
