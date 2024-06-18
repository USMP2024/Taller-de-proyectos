import AWS from "aws-sdk";

//export const handler = async (event) => {
  // Configuración de AWS
  //AWS.config.update({
    //region: "us-east-1",
   // accessKeyId: "",
   // secretAccessKey: "",
  //});

  // Instancias de servicios de AWS
  const dynamodb = new AWS.DynamoDB();
  const s3client = new AWS.S3();

  // Verificar si el campo "month" está presente en el evento
  if (!event.month) {
    const response = {
      statusCode: 404,
      'headers': {
        'Access-Control-Allow-Origin': '*'
    },
      body: "month is required",
    };
    return response;
  }

  // Obtener el mes objetivo del evento
  let target_month = event.month;

  try {
    // Consultar la tabla DynamoDB
    const params = {
      TableName: "DynamoFestividades",
    };
    const data = await dynamodb.scan(params).promise();
    console.log("Datos obtenidos de DynamoDB:", data);

    // Filtrar eventos por mes objetivo
    const eventos = data.Items.filter((evento) => {
      let fechaEvento = evento.FechaEvento.S.split('-'); // Separar la fecha en día, mes y año
      let evento_month = parseInt(fechaEvento[1]); // Tomar el mes de la fecha

      return evento_month === target_month;
    });

    // Si no hay eventos en el mes objetivo, devolver una respuesta de error
    if (eventos.length === 0) {
      const response = {
        statusCode: 404,
        'headers': {
          'Access-Control-Allow-Origin': '*'
      },
        body: `No hay eventos en el mes de ${event.month}`,
      };
      return response;
    }

    // Mapear los datos de todos los eventos que ocurran en el mes especificado
    const expedientesMap = eventos.map((evento) => {
      const expedienteMap = {
        idevento: evento.idevento.S,
        fechaEvento: evento.FechaEvento.S,
        mesEvento: evento.MesEvento.S,
        nombreEvento: evento.NombreEvento.S
      };

      // Generar la URL firmada de la imagen del evento
      const paramS3 = {
        Bucket: "tubucket",
        Key: "imagenes/" + expedienteMap.idevento + ".jpg",
      };
      expedienteMap.imagenEvento = s3client.getSignedUrl("getObject", paramS3);

      return expedienteMap;
    });

    // Construir y retornar la respuesta exitosa con los datos de todos los eventos del mes
    const response = {
      statusCode: 200,
      'headers': {
        'Access-Control-Allow-Origin': '*'
    },
      body: expedientesMap,
    };
    return response;
  } catch (error) {
    // Manejo de errores
    const response = {
      statusCode: 500,
      'headers': {
        'Access-Control-Allow-Origin': '*'
      },
      body: "Error interno del servidor",
    };
    return response;
  }

