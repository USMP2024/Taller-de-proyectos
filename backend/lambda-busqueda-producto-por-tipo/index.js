const mysql = require('mysql2/promise');

const handler = async (event) => {
  const tipoBusqueda = event.tipoBusqueda;
  const pagina = event.pagina || 0;
  const resultadosPorPagina = 80;
  const tipo = 1;
  const inicio = (pagina - 1) * resultadosPorPagina;

  try {
    const connection = await mysql.createConnection({
      host: 'rds-development-db.chu4imeus62g.us-east-1.rds.amazonaws.com',
      user: 'admindev',
      password: 'passworddev',
      database: 'db_cloud'
    });

    const consulta = `SELECT P.pro_int_id_producto AS idProducto, 
                             P.pro_txt_nombre_producto AS nombre_producto, 
                             P.pro_int_id_tipo AS tipo_producto
                      FROM ora_productos P 
                      WHERE P.pro_int_id_tipo LIKE '%${tipoBusqueda}%'
                      LIMIT ${pagina}, ${resultadosPorPagina}`;

    const [results] = await connection.query(consulta);
    await connection.end();
    
    const formattedResult = {
      idProducto: results.idProducto,
      nombre_producto: results.nombre_producto,
      tipo_producto: results.tipo_producto,
};

    return {
      statusCode: 200,
      body: JSON.stringify(results),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ mensaje: "Error interno del servidor: " + error }),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  }
};

module.exports={handler};