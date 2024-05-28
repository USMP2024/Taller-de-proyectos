import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {
    const { idPregunta, tipoCalificacion } = JSON.parse(event.body);

    // Verificar que tipoCalificacion sea válido
    if (!['Like', 'Dislike'].includes(tipoCalificacion)) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'tipoCalificacion inválido' })
        };
    }

    const updateExpression = tipoCalificacion === 'Like' 
        ? 'SET nroMeGustas = nroMeGustas + :increment'
        : 'SET nroNoMeGustas = nroNoMeGustas + :increment';

    const params = {
        TableName: 'dynamo-preguntas-frecuentes',
        Key: {
            idPregunta: idPregunta
        },
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: {
            ':increment': 1
        },
        ReturnValues: 'UPDATED_NEW'
    };

    try {
        await dynamodb.update(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({
                msj: 'Se registró su calificación',
                tipoCalificacion: tipoCalificacion
            })
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error al registrar la calificación' })
        };
    }
};
