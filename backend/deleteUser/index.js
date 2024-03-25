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
        const { id } = JSON.parse(event.body); // Asume que el ID del usuario a eliminar viene en el cuerpo de la solicitud
        await new Promise((resolve, reject) => {
            connection.query('DELETE FROM Usuarios WHERE id = ?', [id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });

        response = {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin": "*", // Ajusta según tu política de CORS
            },
            body: JSON.stringify({ message: "Usuario eliminado con éxito" }),
        };
    } catch (error) {
        console.error(error);
        response = {
            statusCode: 500,
            
            body: JSON.stringify({ message: "Error al eliminar el usuario" }),
        };
    }

    return response;
};
