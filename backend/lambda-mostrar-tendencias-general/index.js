// Importar el módulo mysql2 para conectarse a MySQL
const mysql = require('mysql2/promise');

// Función principal de Lambda
exports.handler = async (event, context) => {
  // Configurar la conexión a la base de datos MySQL en AWS RDS
  const connection = await mysql.createConnection({
    host: 'rds-development-db.chu4imeus62g.us-east-1.rds.amazonaws.com',
    user: 'admindev',
    password: 'passworddev',
    database: 'db_cloud'
  });

  try {
    // Obtener los parámetros de la solicitud
    const page = parseInt(event.headers.page); 
    const imagesPerPage = parseInt(event.headers.imagesPerPage); 
    const tipoTendencia = event.headers.tipoTendencia;
    // Calcular el offset para la consulta SQL

    // Construir la consulta SQL en función del tipo de tendencia
    let query = 'SELECT pro_int_id_producto, pro_txt_nombre_producto, pro_txt_descripcion_producto, pro_int_id_tipo, pro_int_id_artista, pro_txt_url_producto FROM ora_productos WHERE ';
    if (tipoTendencia !== null) {
      query += `pro_int_id_tipo = ? AND `;
    }
    query += `pro_int_contador_vistas > 0 ORDER BY pro_int_contador_vistas DESC LIMIT ?, ?`;

    // Ejecutar la consulta SQL
    const offset = (page - 1) * imagesPerPage;
    const offsetInt = parseInt(offset.toString(), 10);
    const imagesPerPageInt = parseInt(imagesPerPage.toString(), 10);
    const [rows] = await connection.execute(connection.format(query, [tipoTendencia, offsetInt, imagesPerPageInt]));

    // Procesar los resultados y generar la respuesta
    const productos = rows.map(row => ({
      id_producto: row.pro_int_id_producto,
      nombre_producto: row.pro_txt_nombre_producto,
      descripcion_producto: row.pro_txt_descripcion_producto,
      id_categoria: row.pro_int_id_tipo,
      id_artista: row.pro_int_id_artista,
      url_producto: row.pro_txt_url_producto
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(productos)
    };
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error interno del servidor' })
    };
  } finally {
    // Cerrar la conexión a la base de datos
    await connection.end();
  }
};