import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {
    const { cadenaDeBusqueda } = JSON.parse(event.body);

    const params = {
        TableName: 'dynamo-preguntas-frecuentes',
        FilterExpression: 'contains(pregunta, :search) OR contains(respuesta, :search)',
        ExpressionAttributeValues: {
            ':search': cadenaDeBusqueda
        }
    };

    try {
        const data = await dynamodb.scan(params).promise();
        const resultadoBusqueda = data.Items.map(item => ({
            idPregunta: item.idPregunta,
            pregunta: item.pregunta,
            categoriaPregunta: item.categoriaPregunta
        }));

        return {
            statusCode: 200,
            body: JSON.stringify({ resultadoBusqueda })
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error al buscar preguntas frecuentes' })
        };
    }
};
