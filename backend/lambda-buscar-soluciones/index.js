const AWS = require('aws-sdk');
const Fuse = require('fuse.js');

// Configura las credenciales de AWS directamente


const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    // Recibe los parámetros desde event.body
    const { cadenaBusqueda } = JSON.parse(event.body);

    // Define las opciones para la búsqueda difusa
    const options = {
        keys: ['pregunta'], // Propiedades del objeto a buscar
        includeScore: true, // Incluir el score de similitud en los resultados
        threshold: 0.4 // Umbral de similitud para los resultados
    };

    // Realiza una consulta a DynamoDB para obtener todas las preguntas
    const params = {
        TableName: 'preguntas'
    };

    let preguntas = [];

    try {
        const data = await dynamoDb.scan(params).promise();
        preguntas = data.Items;
    } catch (error) {
        console.error("Error al obtener las preguntas de DynamoDB:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error al obtener las preguntas de DynamoDB' })
        };
    }

    // Crea una instancia de Fuse con las opciones especificadas
    const fuse = new Fuse(preguntas, options);

    // Realiza la búsqueda difusa
    const resultados = fuse.search(cadenaBusqueda);

    // Retorna los resultados
    return {
        statusCode: 200,
        body: JSON.stringify({ resultados })
    };
};