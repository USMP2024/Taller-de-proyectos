const AWS = require('aws-sdk');

//const dynamodb = new AWS.DynamoDB.DocumentClient();

const handler = async (event) => {
    const idPregunta   = parseInt(event.queryStringParameters.idPregunta);
    console.log(idPregunta + "---" + typeof(idPregunta))


    const dynamodb = new AWS.DynamoDB.DocumentClient();


    const params = {
        TableName: 'dynamo-preguntas-frecuentes',
        Key: {
            idPregunta: idPregunta
        }
    };

    try {
        const data = await dynamodb.get(params).promise();
        if (!data.Item) {
            return {
                statusCode: 404,
                'headers': {
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ error: 'Pregunta no encontrada' })
            };
        }

        const { pregunta, respuesta, categoriaPregunta, nroMeGustas, nroNoMeGustas } = data.Item;

        return {
            statusCode: 200,
            'headers': {
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                idPregunta,
                pregunta,
                respuesta,
                categoriaPregunta,
                nroMeGustas,
                nroNoMeGustas,
                Categoria: categoriaPregunta
            })
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            'headers': {
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ error: 'Error al obtener la pregunta frecuente' })
        };
    }
};

exports.handler = handler;
