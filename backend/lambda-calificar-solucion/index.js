const AWS = require('aws-sdk');

// Configurar las credenciales de AWS


// Crear un nuevo cliente DynamoDB
const dynamoDB = new AWS.DynamoDB();

exports.handler = async (event) => {
    try {
        // Parsear los datos del evento POST
        const requestBody = JSON.parse(event.body);
        const idSolucion = requestBody.idSolucion; // Mantenerlo como número
        const tipoCalificacion = requestBody.tipoCalificacion; // Tipo de calificación
        const solucion = requestBody.solucion; // Obtener el valor de la solución del cuerpo del evento

        // Verificar si idSolucion es un número válido
        if (isNaN(idSolucion)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "El idSolucion proporcionado no es un número válido." })
            };
        }

        // Verificar si el tipo de calificación es válido
        if (tipoCalificacion !== "LIKE" && tipoCalificacion !== "DISLIKE") {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "El tipo de calificación debe ser 'LIKE' o 'DISLIKE'." })
            };
        }

        // Incrementar el contador correspondiente según el tipo de calificación
        const updateParams = {
            TableName: 'dynamo_soluciones',
            Key: {
                idSolucion: { N: idSolucion.toString() },
                solucion: { S: solucion }
            },
            UpdateExpression: tipoCalificacion === "LIKE" ? "SET nroMeGustas = nroMeGustas + :inc" : "SET nroNoMeGustas = nroNoMeGustas + :inc",
            ExpressionAttributeValues: {
                ":inc": { N: "1" }
            }
        };

        // Actualizar el contador en DynamoDB
        await dynamoDB.updateItem(updateParams).promise();

        // Respuesta exitosa
        return {
            statusCode: 200,
            body: JSON.stringify({ message: `Se registró tu calificación como ${tipoCalificacion}` })
        };
    } catch (error) {
        // Manejar errores
        console.error("Error al procesar la calificación:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error interno del servidor.", error: error.message })
        };
    }
};
