const mysql = require('mysql2');

// Configuración directa (no recomendada para producción)
const config = {
    dbHost: 'taller.cnqcwuwg8ykf.us-east-1.rds.amazonaws.com',
    dbUser: 'JoseDavid',
    dbPassword: 'perales_123',
    dbName: 'primera'
};

const connection = mysql.createConnection({
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbName
});

exports.handler = async (event) => {
    let response;
    try {
        const { id } = event.queryStringParameters; // Asume que el ID del usuario viene como un parámetro de consulta en la URL
        const result = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM Usuarios WHERE id = ?', [id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });

        if (result.length > 0) {
            response = {
                statusCode: 200,
                headers: {
                  "Access-Control-Allow-Origin": "*", // Ajusta según tu política de CORS
                },
                body: JSON.stringify(result[0]), // Devuelve el primer usuario encontrado
            };
        } else {
            response = {
                statusCode: 404,
                headers: {
                  "Access-Control-Allow-Origin": "*", // Ajusta según tu política de CORS
                },
                body: JSON.stringify({ message: "Usuario no encontrado" }),
            };
        }
    } catch (error) {
        console.error(error);
        response = {
            statusCode: 500,
            body: JSON.stringify({ message: "Error al obtener el usuario" }),
        };
    }

    return response;
};
