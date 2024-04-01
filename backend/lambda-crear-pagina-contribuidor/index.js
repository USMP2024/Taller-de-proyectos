import AWS from "aws-sdk";
// Función para manejar el evento de Lambda
export const handler = async (event) => {
 // Configuracion de credenciales para AWS
  //AWS.config.update({
   // region: "us-east-1",
   // accessKeyId: "*",
   // secretAccessKey: "*",
 // });

  // creacion de instancias de Dynamo y S3
  const dynamobd = new AWS.DynamoDB();
  const s3client = new AWS.S3();
  
  // Validacion de existencia del campo Start date
  if (!event.start_date) {
    const response = {
      statusCode: 404,
      body: "start_date is required",
    };
    return response;
  }
  let end_date_validate;
  let start_date_validate;

  // Validacion de la fecha de fin proporcionada del evento
  try {
    end_date_validate = event.end_date ? new Date(event.end_date) : new Date();
  } catch {
    const response = {
      statusCode: 404,
      body: "start_date is invalid",
    };
    return response;
  }

  // Validacion de la fecha de incio proporcionada
  try {
    start_date_validate = new Date(event.start_date);
  } catch {
    const response = {
      statusCode: 404,
      body: "start_date is invalid",
    };
    return response;
  }
  try {
    // Consulta de datos desde DynamoDB
    const params = {
      TableName: "dynamo_noticias",
    };
    const data = await dynamobd.scan(params).promise();
    const noticias = data.Items.map((noticia) => {
      // recorrer todos los datos de la noticia y obtener la fecha de publicacion
      console.log(noticia);
      let fechaPublicacion = new Date(noticia.fechaPublicacion.S);
      
      //Veriicar si la noticia coincide con los criterios de busqueda
      if (
        noticia.tituloNoticia.S.includes(event.title) &&
        fechaPublicacion >= start_date_validate &&
        fechaPublicacion <= end_date_validate
      ) {
        const expedienteMap = {};
        for (let key in noticia) {
          expedienteMap[key] = noticia[key].S;
        }
        //Obtener la URL firmada de la imagen de la noticia desde s3
        const paramS3 = {
          Bucket: "noticiasbucket",
          Key: "Sources/" + expedienteMap.Idnoticias + ".jpg",
        };
        expedienteMap.portadaNoticia = s3client.getSignedUrl(
          "getObject",
          paramS3
        );
        return expedienteMap;
      }
    });

    //Construir y retornaer la respuesta con las noticias encontradas 
    const response = {
      statusCode: 200,
      body: noticias,
    };
    return response;
  } catch (error) {
    //Manejo de errores internos del servidor
    const response = {
      statusCode: 500,
      body: "Error interno del servidor",
      error: "ERROR : " + error,
    };
    return response;
  }
}

