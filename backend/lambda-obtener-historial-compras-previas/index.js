const mysql = require('mysql2/promise');

exports.handler = async (event, context) => {
  // Configurar la conexión a la base de datos MySQL en AWS RDS
  const connection = await mysql.createConnection({
    host: 'rds-development-db.chu4imeus62g.us-east-1.rds.amazonaws.com',
    user: 'admindev',
    password: 'passworddev',
    database: 'db_cloud'
  });

  try {
    // Obtener el ID de usuario de la solicitud
    const userId = event.queryStringParameters.userId;
    if (!userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'UserId is required' })
      };
    }

    // Consulta SQL para seleccionar los datos de las ventas y productos
    const [rows] = await connection.execute(`
      SELECT p.*, ven_val_fecha_venta 
      FROM ora_ventas o 
      INNER JOIN ora_productos p ON o.ven_int_id_producto = p.pro_int_id_producto 
      WHERE o.ven_int_id_usuario =?
      ORDER BY ven_val_fecha_venta DESC
    `, [userId]);

    // Procesar los resultados y generar la respuesta
    const comprasPrevias = rows.map(row => ({
      id_producto: row.pro_int_id_producto,
      nombre_producto: row.pro_txt_nombre_producto,
      descripcion_producto: row.pro_txt_descripcion_producto,
      id_categoria: row.pro_int_id_tipo,
      id_artista: row.pro_int_id_artista,
      url_producto: row.pro_txt_url_producto,
      fecha_compra: row.ven_val_fecha_venta
    }));

    const response = {
      comprasPrevias
    };

    return {
      statusCode: 200,
      body: JSON.stringify(response)
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