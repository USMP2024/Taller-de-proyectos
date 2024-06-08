const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    try {
        // Extrae idBlog del evento de entrada
        const { idBlog } = event.pathParameters;

        if (!idBlog) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'idBlog is required' })
            };
        }

        const params = {
            TableName: 'dynamo-paneles-informativos',
            Key: {
                idBlog: parseInt(idBlog, 10) // Asegúrate de que idBlog sea un número entero
            },
            ProjectionExpression: 'idBlog, urlS3, titulo, categoria, encabezado, fechaSubida, fechaActualizacion'
        };

        const data = await dynamoDb.get(params).promise();

        if (data.Item) {
            return {
                statusCode: 200,
                body: JSON.stringify(data.Item)
            };
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Blog not found' })
            };
        }
    } catch (error) {
        console.error('Error fetching blog: ', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' })
        };
    }
};
