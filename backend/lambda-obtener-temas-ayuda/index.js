const AWS = require('aws-sdk');

// Configura las credenciales de AWS directamente


const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const temas = {};

    const params = {
        TableName: 'dynamo_soluciones'
    };

    try {
        const data = await dynamoDb.scan(params).promise();
        data.Items.forEach((item) => {
            const tema = item.temaSolucion;
            if (!temas[tema]) {
                temas[tema] = [];
            }
            temas[tema].push({
                idSolucion: item.idSolucion,
                solucion: item.solucion,
                contenidoSolucion: item.contenidoSolucion,
                nroMeGustas: item.nroMeGustas,
                nroNoMeGustas: item.nroNoMeGustas
            });
        });
    } catch (error) {
        console.error("Error al obtener los elementos:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error al obtener los elementos' })
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(temas)
    };
};
