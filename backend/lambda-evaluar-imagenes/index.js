const mysql = require('mysql2');

// Configuración directa (no recomendada para producción)
const config = {
    /*dbHost: 'taller.cnqcwuwg8ykf.us-east-1.rds.amazonaws.com',
    dbUser: 'JoseDavid',
    dbPassword: 'perales_123',
    dbName: 'primera'*/
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
        const { sol_int_id_solicitud, sol_int_id_usuario, sol_txt_estado_aprobacion } = JSON.parse(event.body); // Asume que el cuerpo de la solicitud contiene el ID, nombre y email del usuario a actualizar
        const result = await new Promise((resolve, reject) => {
            const query = 'UPDATE ora_solicitudes_aprobacion SET sol_txt_estado_aprobacion = ? WHERE sol_int_id_solicitud = ?,sol_int_id_usuario = ?';
            connection.query(query, [sol_int_id_solicitud, sol_int_id_usuario, sol_txt_estado_aprobacion], (error, results) => {
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
                body: JSON.stringify({ message: "Solicitud actualizada con éxito" }),
            };
        } else {
            response = {
                statusCode: 404,
                headers: {
                  "Access-Control-Allow-Origin": "*", // Ajusta según tu política de CORS
                },
                body: JSON.stringify({ message: "Solicitud no encontrada" }),
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