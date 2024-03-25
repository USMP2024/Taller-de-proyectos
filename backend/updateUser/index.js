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
        const { id, nombre, email } = JSON.parse(event.body); // Asume que el cuerpo de la solicitud contiene el ID, nombre y email del usuario a actualizar
        const result = await new Promise((resolve, reject) => {
            const query = 'UPDATE Usuarios SET nombre = ?, email = ? WHERE id = ?';
            connection.query(query, [nombre, email, id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });

        if (result.affectedRows > 0) {
            response = {
                statusCode: 200,
                headers: {
                  "Access-Control-Allow-Origin": "*", // Ajusta según tu política de CORS
                },
                body: JSON.stringify({ message: "Usuario actualizado con éxito" }),
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
            body: JSON.stringify({ message: "Error al actualizar el usuario" }),
        };
    }

    return response;
};
