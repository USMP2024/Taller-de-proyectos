const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    try {
        // Extrae categoriaPublicacion del evento de entrada
        const { categoriaPublicacion } = event.pathParameters;

        if (!categoriaPublicacion) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'categoriaPublicacion is required' })
            };
        }

        const params = {
            TableName: 'dynamo-paneles-informativos',
            IndexName: 'categoriaPublicacion-index', // Asume un GSI en categoriaPublicacion
            KeyConditionExpression: 'categoria = :categoriaPublicacion',
            ExpressionAttributeValues: {
                ':categoriaPublicacion': categoriaPublicacion
            },
            ProjectionExpression: 'idBlog, urlS3, titulo, categoria, encabezado, fechaSubida, fechaActualizacion',
            ScanIndexForward: false, // Orden descendente por fechaSubida
            Limit: 4
        };

        const data = await dynamoDb.query(params).promise();

        if (data.Items && data.Items.length > 0) {
            // Sort the items by fechaSubida in descending order
            data.Items.sort((a, b) => new Date(b.fechaSubida) - new Date(a.fechaSubida));
            // Limit the results to 4
            const topBlogs = data.Items.slice(0, 4);

            return {
                statusCode: 200,
                body: JSON.stringify(topBlogs)
            };
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'No blogs found for the specified category' })
            };
        }
    } catch (error) {
        console.error('Error fetching blogs: ', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' })
        };
    }
};
