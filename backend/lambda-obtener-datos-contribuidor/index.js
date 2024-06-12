const mysql = require('mysql'); // Importa el módulo mysql para interactuar con una base de datos MySQL.
const util = require('util'); // Importa el módulo util para usar promisify y convertir funciones callback-based a promises.

// Crea un pool de conexiones a la base de datos con las credenciales y parámetros especificados.
const pool = mysql.createPool({
    host: 'rds-development-db.chu4imeus62g.us-east-1.rds.amazonaws.com',
    user: 'admindev',
    password: 'passworddev',
    database: 'db_cloud'
});

// Convierte pool.query a una función basada en promesas para usar async/await.
const query = util.promisify(pool.query).bind(pool);

// Función handler principal que se ejecuta cuando se invoca la función Lambda.
exports.handler = async (event) => {
  console.log('Received event:', JSON.stringify(event, null, 2)); // Loguea el evento recibido para depuración.

  // Obtiene y convierte los parámetros de la solicitud.
  const idUsuario = parseInt(event.queryStringParameters.idUsuario);
  const rolUsuario = event.queryStringParameters.rolUsuario;

  // Verifica si los parámetros son válidos. Si no, retorna un error 400.
  if (!idUsuario || rolUsuario !== 'Contribuidor') {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid parameters' })
    };
  }

  try {
    // Consulta SQL para obtener los detalles del usuario y sus relaciones con otras tablas.
    const userQuery = `
      SELECT usr.usr_txt_correo_electronico as email, 
             usr.usr_int_id_usuario as idUsuario, 
             usr.usr_txt_nickname as nombreUsuario, 
             usr.usr_txt_contrasena as contrasena, 
             usr.usr_txt_nombre_legal as nombreUsuarioAPagar, 
             dtl.txt_direccion_postal as direccionPostal, 
             dtl.txt_direccion_complementaria as lineaDireccion, 
             dtl.txt_ciudad as ciudad, 
             dtl.int_codigo_postal as codigoPostal, 
             dtl.txt_pais as país, 
             dtl.txt_provincia as provincial, 
             dtl.txt_correo_pago as correoPago, 
             dtl.txt_pago_minimo as pagoMinimo, 
             dtl.txt_url_sitio_web as sitioWeb, 
             dtl.txt_frase_cierre as fraseCierre, 
             adm.ora_profesion as tipoColaborador, 
             adm.ora_estilos as estilos, 
             adm.ora_temas as temas, 
             adm.ora_equipo as equipo, 
             red.txt_facebook as redFacebook, 
             red.txt_instagram as redInstagram, 
             red.txt_linkedin as redLinkedin, 
             red.txt_twitter as redTwitter
      FROM ora_usuarios usr
      LEFT JOIN ora_detalle_usuario dtl ON usr.usr_int_id_usuario = dtl.usr_int_id_usuario
      LEFT JOIN ora_detalle_red red ON usr.usr_int_id_usuario = red.id_usuario
      LEFT JOIN ora_acerca_de_mi adm ON usr.usr_int_id_usuario = adm.ora_int_id_usuario
      WHERE usr.usr_int_id_usuario = ? AND usr.usr_int_id_rol = 'Contribuidor';
    `;

    // Ejecuta la consulta con el idUsuario proporcionado.
    const results = await query(userQuery, [idUsuario]);
    console.log('Query results:', results); // Loguea los resultados de la consulta para depuración.

    // Si no se encuentra ningún resultado, retorna un error 404.
    if (results.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Contributor not found' })
      };
    }

    // Si se encuentra el usuario, retorna los detalles del mismo.
    return {
      statusCode: 200,
      body: JSON.stringify(results[0])
    };
  } catch (error) {
    // Si ocurre un error durante la consulta, loguea el error y retorna un error 500.
    console.error('Database query error', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error', error: error.message })
    };
  }
};
