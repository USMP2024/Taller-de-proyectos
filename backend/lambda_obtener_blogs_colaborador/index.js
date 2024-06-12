const AWS = require('aws-sdk');

// Handler de la función Lambda
exports.handler = async (event) => {
    // Parámetros para el método scan de DynamoDB
    const params = {
        TableName: 'dynamo_blog_colaborador'
    };

    try {
        // Escanea la tabla para obtener todos los items
        const data = await dynamoDB.scan(params).promise();
        
        // Verifica si no se encontraron blogs
        if (!data.Items || data.Items.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'No blogs found' })
            };
        }

        // Mapea los items obtenidos a la estructura de respuesta deseada
        const response = data.Items.map(item => ({
            idBlog: item.idBlog,
            urlS3: item.urlS3,
            titulo: item.Titulo,
            encabezado: item.Encabezado1,
            fechaSubida: item.fechaSubida
        }));

        // Retorna la respuesta con código de estado 200 y los blogs encontrados
        return {
            statusCode: 200,
            body: JSON.stringify(response)
        };
    } catch (error) {
        // Manejo de errores, retorna código de estado 500 con el mensaje de error
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error', error: error.message })
        };
    }
};