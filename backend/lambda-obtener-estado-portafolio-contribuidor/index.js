// Función para manejar solicitudes de consulta de estado de aprobaciones de imágenes de un usuario
exports.handler = async (event) => {
  // Extraer el ID del usuario del cuerpo de la solicitud
  const { sol_int_id_usuario } = JSON.parse(event.body);

  // Configurar la conexión a la base de datos
  const connection = await mysql.createConnection({
      host: 'rds-development-db.chu4imeus62g.us-east-1.rds.amazonaws.com',
      user: 'admindev',
      password: 'passworddev',
      database: 'db_cloud'
  });

  try {
      // Ejecutar la consulta para obtener el estado de aprobaciones de imágenes del usuario
      const [rows] = await connection.execute(`
          SELECT sol_txt_tipo_imagen, sol_txt_estado_aprobacion, COUNT(*) as count
          FROM ora_solicitudes_aprobacion
          WHERE sol_int_id_usuario = ?
          GROUP BY sol_txt_tipo_imagen, sol_txt_estado_aprobacion
      `, [sol_int_id_usuario]);

      // Procesar los resultados
      let response = {};
      
      rows.forEach(row => {
          // Inicializar el objeto de respuesta para cada tipo de imagen si no existe
          if (!response[row.sol_txt_tipo_imagen]) {
              response[row.sol_txt_tipo_imagen] = {
                  Noenviado: 0,
                  pendiente: 0,
                  aprobada: 0
              };
          }

          // Asignar el conteo a la categoría correspondiente del estado de aprobación
          if (row.sol_txt_estado_aprobacion === 'No enviado') {
              response[row.sol_txt_tipo_imagen].Noenviado = row.count;
          } else if (row.sol_txt_estado_aprobacion === 'pendiente') {
              response[row.sol_txt_tipo_imagen].pendiente = row.count;
          } else if (row.sol_txt_estado_aprobacion === 'aprobada') {
              response[row.sol_txt_tipo_imagen].aprobada = row.count;
          }
      });

      // Devolver la respuesta con el estado de aprobaciones
      return {
          statusCode: 200,
          body: JSON.stringify(response)
      };

  } catch (error) {
      // Manejar errores durante la ejecución de la consulta
      console.error('Error executing query:', error);
      return {
          statusCode: 500,
          body: JSON.stringify({ error: error.message })
      };
  } finally {
      // Cerrar la conexión a la base de datos
      await connection.end();
  }
};
