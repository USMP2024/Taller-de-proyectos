import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {
    const { idPregunta } = JSON.parse(event.body);

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
                body: JSON.stringify({ error: 'Pregunta no encontrada' })
            };
        }

        const { pregunta, respuesta, categoriaPregunta, nroMeGustas, nroNoMeGustas } = data.Item;

        return {
            statusCode: 200,
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
            body: JSON.stringify({ error: 'Error al obtener la pregunta frecuente' })
        };
    }
};
