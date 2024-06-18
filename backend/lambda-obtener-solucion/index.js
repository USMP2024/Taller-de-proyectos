const AWS = require('aws-sdk');

// Configurar las credenciales de AWS

// Crear un nuevo cliente DynamoDB
const dynamoDB = new AWS.DynamoDB();

exports.handler = async (event) => {
    try {
        // Parsear los datos del evento POST
        const requestBody = JSON.parse(event.body);
        const idSolucion = parseInt(requestBody.idSolucion); // Convertir a número
        const solucion = requestBody.solucion; // Clave de ordenación

        // Verificar si idSolucion es un número válido
        if (isNaN(idSolucion)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "El idSolucion proporcionado no es un número válido." })
            };
        }

        // Parámetros para la consulta
        const params = {
            TableName: 'dynamo_soluciones_tb',
            Key: {
                idSolucion: { N: idSolucion.toString() }, // Convertir a cadena para DynamoDB
                solucion: { S: solucion } // Clave de ordenación
            }
        };

        // Realizar la consulta a DynamoDB
        const data = await dynamoDB.getItem(params).promise();

        if (data.Item) {
            // Si se encuentra el item, devolverlo como respuesta
            return {
                statusCode: 200,
                body: JSON.stringify(data.Item)
            };
        } else {
            // Si el item no se encuentra, devolver un mensaje de error
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "No se encontró el item con las claves proporcionadas." })
            };
        }
    } catch (error) {
        // Manejar errores de consulta
        console.error("Error al obtener el item desde DynamoDB", error);

        // Evitar convertir estructuras circulares a JSON
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error interno del servidor.", error: error.message })
        };
    }
};
