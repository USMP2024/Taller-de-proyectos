const AWS = require("aws-sdk");
// Función para manejar el evento de Lambda
const handler = async (event) => {
  // creacion de instancias de Dynamo y S3
  const dynamobd = new AWS.DynamoDB();
  const s3client = new AWS.S3();

  // Validacion de existencia del campo Start date
  if (!event.queryStringParameters.start_date) {
    const response = {
      statusCode: 404,
      body: "start_date is required.....",
    };
    return response;
  }
  let end_date_validate;
  let start_date_validate;

  // Validacion de la fecha de fin proporcionada del evento
  try {
    end_date_validate = event.queryStringParameters.end_date ? new Date(event.queryStringParameters.end_date) : new Date();
  } catch {
    const response = {
      statusCode: 404,
      body: "start_date is invalid",
    };
    return response;
  }

  // Validacion de la fecha de incio proporcionada
  try {
    start_date_validate = new Date(event.queryStringParameters.start_date);
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
      TableName: "dynamo_prueba",
    };
    const data = await dynamobd.scan(params).promise();
    let noticias = data.Items.map((noticia) => {

      var partes = noticia.fechaPublicacion.S.split("/");
      var dia = parseInt(partes[0], 10);
      var mes = parseInt(partes[1], 10) - 1; 
      var anio = parseInt(partes[2], 10);
      
      let fechaPublicacion = new Date(anio,mes ,dia);

      console.log(noticia)
      
      if (
        noticia.tituloNoticia.S.includes(event.queryStringParameters.title) &&
        fechaPublicacion >= start_date_validate &&
        fechaPublicacion <= end_date_validate
      ){
        const expedienteMap = {};
        for (let key in noticia) {
          expedienteMap[key] = noticia[key].S;
        }
        //Obtener la URL firmada de la imagen de la noticia desde s3
        const paramS3 = {
          Bucket: "s3-noticias-bucket",
          Key: "Sources/" + expedienteMap.Idnoticias + ".jpg",
        };
        expedienteMap.portadaNoticia = s3client.getSignedUrl(
          "getObject",
          paramS3
        );
        return expedienteMap;
      }
    });
    noticias = noticias.filter(elemento => elemento !== undefined && elemento !==null)

    //Validacion de retorno , en caso no existan elementos a retornar es porque no existen en la base de datos
    //if(noticias.length > 0){
      const response = {
        statusCode: 200,
        body: noticias,
      };

      return response;

    /*}else{
      const response = {
        statusCode: 404,
        body: "Not Found : No se encontraron noticias",
      }

      return response;
    }*/

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

module.exports = {handler}
