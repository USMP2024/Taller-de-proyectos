const mysql = require('mysql');
const util = require('util');

// Configuración del pool de conexiones a la base de datos
const pool = mysql.createPool({
    host: 'rds-development-db.chu4imeus62g.us-east-1.rds.amazonaws.com',
    user: 'admindev',
    password: 'passworddev',
    database: 'db_cloud'
});

// Convertir las consultas del pool a promesas
const query = util.promisify(pool.query).bind(pool);

// Función Lambda
exports.handler = async (event) => {
  // Obtener el idUsuario del evento y convertirlo a entero
  const idUsuario = parseInt(event.queryStringParameters.idUsuario);
  const updates = event.queryStringParameters;
  
  // Campos permitidos para actualización
  const allowedFields = [
    'email', 'nombreUsuario', 'direccionPostal', 'lineaDireccion', 'ciudad',
    'codigoPostal', 'país', 'provincial', 'contrasena', 'nombreUsuarioAPagar',
    'correoPago', 'pagoMinimo', 'fotoPerfil', 'sitioWeb', 'fraseCierre',
    'tipoColaborador', 'estilos', 'temas', 'equipo', 'bibliografia', 
    'redFacebook', 'redInstagram', 'redLinkedin', 'redTwitter'
  ];
  
  // Validar que idUsuario esté presente
  if (!idUsuario) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'idUsuario is required' })
    };
  }

  // Crear un objeto con los campos a actualizar
  const fieldsToUpdate = {};
  allowedFields.forEach(field => {
    if (updates[field] !== undefined) {
      fieldsToUpdate[field] = updates[field];
    }
  });

  // Validar que haya campos válidos para actualizar
  if (Object.keys(fieldsToUpdate).length === 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'No valid fields to update' })
    };
  }

  const updatePromises = [];

  try {
    // Construir y agregar las promesas de las consultas de actualización
    for (const [field, value] of Object.entries(fieldsToUpdate)) {
      let updateQuery;
      let queryParams = [value, idUsuario];

      // Construir la consulta basada en el campo
      switch (field) {
        case 'email':
        case 'nombreUsuario':
        case 'contrasena':
        case 'nombreUsuarioAPagar':
          updateQuery = `UPDATE ora_usuarios SET ${fieldMap[field]} = ? WHERE usr_int_id_usuario = ?`;
          break;
        case 'direccionPostal':
        case 'lineaDireccion':
        case 'ciudad':
        case 'codigoPostal':
        case 'país':
        case 'provincial':
        case 'correoPago':
        case 'pagoMinimo':
        case 'fotoPerfil':
        case 'sitioWeb':
        case 'fraseCierre':
          updateQuery = `UPDATE ora_detalle_usuario SET ${fieldMap[field]} = ? WHERE usr_int_id_usuario = ?`;
          break;
        case 'tipoColaborador':
        case 'estilos':
        case 'temas':
        case 'equipo':
        case 'bibliografia':
          updateQuery = `UPDATE ora_acerca_de_mi SET ${fieldMap[field]} = ? WHERE ora_int_id_usuario = ?`;
          break;
        case 'redFacebook':
        case 'redInstagram':
        case 'redLinkedin':
        case 'redTwitter':
          updateQuery = `UPDATE ora_detalle_red SET ${fieldMap[field]} = ? WHERE id_usuario = ?`;
          break;
      }

      // Agregar la promesa de la consulta a la lista
      if (updateQuery) {
        updatePromises.push(query(updateQuery, queryParams));
      }
    }

    // Ejecutar todas las promesas en paralelo
    await Promise.all(updatePromises);

    // Respuesta de éxito
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: `Se edito el perfil contribuidor, los campos que se editaron fueron: ${Object.keys(fieldsToUpdate).join(', ')}` 
      })
    };
  } catch (error) {
    // Manejo de errores
    console.error('Database query error', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' })
    };
  }
};

// Mapeo de los campos permitidos a sus nombres en la base de datos
const fieldMap = {
  email: 'usr_txt_correo_electronico',
  nombreUsuario: 'usr_txt_nickname',
  direccionPostal: 'txt_direccion_postal',
  lineaDireccion: 'txt_direccion_complementaria',
  ciudad: 'txt_ciudad',
  codigoPostal: 'int_codigo_postal',
  país: 'txt_pais',
  provincial: 'txt_provincia',
  contrasena: 'usr_txt_contrasena',
  nombreUsuarioAPagar: 'usr_txt_nombre_legal',
  correoPago: 'txt_correo_pago',
  pagoMinimo: 'txt_pago_minimo',
  fotoPerfil: 'dtl_txt_url_foto_perfil',
  sitioWeb: 'txt_url_sitio_web',
  fraseCierre: 'txt_frase_cierre',
  tipoColaborador: 'ora_profesion',
  estilos: 'ora_estilos',
  temas: 'ora_temas',
  equipo: 'ora_equipo',
  bibliografia: 'ora_bibliografia',
  redFacebook: 'txt_facebook',
  redInstagram: 'txt_instagram',
  redLinkedin: 'txt_linkedin',
  redTwitter: 'txt_twitter'
};
