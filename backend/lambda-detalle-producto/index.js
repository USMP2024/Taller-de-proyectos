const mysql = require('mysql2/promise'); // Importa las bibliotecas necesarias

  // Configura la conexión a la base de datos
  const dbConfig = {
    host: 'rds-development-db.chu4imeus62g.us-east-1.rds.amazonaws.com',
    user: 'admindev',
    password: 'passworddev',
    database: 'db_cloud'
  };


exports.handler = async (event, context) => {
  const idBusqueda = event.idBusqueda || '';
    try {
      const idProducto = event.headers.idProducto;// Obtiene el idProducto del encabezado
  
      
      const connection = mysql.createConnection(dbConfig); // Conexión a la base de datos
  
      // Consulta SQL para obtener los detalles del producto y el usuario contribuidor
      const query = `SELECT P.pro_int_id_producto AS idProducto, 
                            P.pro_txt_nombre_producto AS nombre_producto, 
                            P.pro_txt_descripcion_producto AS descripcion_producto, 
                            P.pro_int_contador_vistas AS contador_vistas, 
                            P.pro_val_precio_producto AS precio_producto, 
                            P.pro_txt_url_producto AS url_img_producto, 
                            P.pro_int_id_artista AS id_artista,
                            u.nombre AS nombre_contribuidor
                      FROM ora_productos P
                      INNER JOIN ora_usuarios A ON P.pro_int_id_artista = A.usr_int_id_usuario
                      WHERE P.pro_int_id_producto LIKE '%${idBusqueda}%'`;
  
      const [rows] = await connection.execute(query, [idProducto]);// Ejecuta la consulta
  
      connection.end();// Cierra la conexión a la base de datos
  
      // Verifica si se encontraron resultados
      if (rows.length === 0) {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: 'Producto no encontrado' }),
        };
      }
  
      // Devuelve los detalles del producto y el usuario contribuidor
      return {
        statusCode: 200,
        body: JSON.stringify(rows[0]),
      };
    } catch (error) {
      console.error('Error al obtener detalles del producto:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error interno del servidor' }),
      };
    }
};