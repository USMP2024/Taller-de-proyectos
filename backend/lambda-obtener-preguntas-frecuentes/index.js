const AWS = require('aws-sdk');

exports.handler = async (event) => {
    const categories = ["Comenzar", "Revisión del contenido", "Su cartera", "Centro legal"];
    const results = {};

    const dynamodb = new AWS.DynamoDB.DocumentClient();

    for (const category of categories) {
        const params = {
            TableName: 'dynamo-preguntas-frecuentes',
            IndexName: 'categoriaPreguntaIndex',  // Assuming there is a secondary index on categoriaPregunta
            KeyConditionExpression: '#cat = :category',
            ExpressionAttributeNames: {
                '#cat': 'categoriaPregunta'
            },
            ExpressionAttributeValues: {
                ':category': category
            }
        };

        try {
            const response = await dynamodb.query(params).promise();
            const items = response.Items;

            // Sort the items by nroMeGustas in descending order
            items.sort((a, b) => b.nroMeGustas - a.nroMeGustas);

            // Get the top 3 items
            const topItems = items.slice(0, 3);
            results[category] = topItems;
        } catch (error) {
            console.error(`Error querying for category ${category}:`, error);
            return {
                statusCode: 500,
                'headers': {
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ error: `Error querying for category ${category}` })
            };
        }
    }

    return {
        statusCode: 200,
        'headers': {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(results)
    };
};
