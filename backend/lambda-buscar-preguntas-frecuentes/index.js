import AWS from 'aws-sdk';

exports.handler = async (event) => {

    const cadenaDeBusqueda = event.queryStringParameters.cadenaDeBusqueda;

    const dynamodb = new AWS.DynamoDB.DocumentClient();

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
