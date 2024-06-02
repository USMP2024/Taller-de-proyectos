const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {
    const categories = ["Comenzar", "Revisión del contenido", "Su cartera", "Centro legal"];
    const results = {};

    for (const category of categories) {
        const params = {
            TableName: 'dynamo-preguntas-frecuentes',
            IndexName: 'idPregunta',  // Assuming there is a secondary index on categoriaPregunta
            KeyConditionExpression: '#cat = :category',
            ExpressionAttributeNames: {
                '#cat': 'categoria'
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
                body: JSON.stringify({ error: `Error querying for category ${category}` })
            };
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify(results)
    };
};
