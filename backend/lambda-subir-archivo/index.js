// Importar el SDK de AWS
const AWS = require("aws-sdk");

// Función de controlador de evento asincrónico
const handler = async (event) => {
  // Crear una instancia de servicio S3 de AWS
  const s3 = new AWS.S3();

  // Decodificar la imagen de base64 a un buffer de datos
  const decodedImage = Buffer.from(event.file, 'base64');

  // Definir los parámetros para la carga del archivo en S3
  const params = {
    Bucket: "imagnes", // Nombre del bucket de S3 donde se almacenará el archivo
    Key: event.name , // Nombre del archivo en S3 (puede ser modificado según sea necesario)
    Body: decodedImage, // Cuerpo del archivo que se va a cargar
  };

  try {
    // Subir el archivo a S3 y esperar a que la operación se complete
    const data = await s3.upload(params).promise();
    console.log(data); // Imprimir información sobre la carga exitosa en la consola
  } catch (error) {
    // Manejar errores en caso de que la carga falle
    console.error("Error al subir el archivo a S3:", error);
  }

  // Preparar la respuesta de la función lambda
  const response = {
    statusCode: 200, // Código de estado HTTP de éxito
    body: event, // Cuerpo de la respuesta que contiene el evento original
  };
  
  // Devolver la respuesta
  return response;
};

module.exports = { handler };
