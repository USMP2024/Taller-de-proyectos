const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    try {
        const params = {
            TableName: 'dynamo-paneles-informativos',
            // ProjectionExpression is used to specify the attributes to retrieve
            ProjectionExpression: 'idBlog, urlS3, titulo, categoria, encabezado, fechaSubida, fechaActualizacion',
            // ScanIndexForward is set to false to get the results in descending order
            ScanIndexForward: false,
            Limit: 4,
            IndexName: 'fechaSubida-index' // Assumes a GSI on fechaSubida attribute
        };

        const data = await dynamoDb.scan(params).promise();

        if (data.Items) {
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
                body: JSON.stringify({ message: 'No blogs found' })
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
