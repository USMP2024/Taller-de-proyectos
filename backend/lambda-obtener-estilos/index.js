const mysql = require('mysql2/promise');

exports.handler = async (event) => {
    // Configuración de la conexión a la base de datos
    const connection = await mysql.createConnection({
        host: 'rds-development-db.chu4imeus62g.us-east-1.rds.amazonaws.com',
        user: 'admindev',
        password: 'passworddev',
        database: 'db_cloud'
    });

    try {
        // Establecer conexión con la base de datos
        connection = await mysql.createConnection(connection);

        // Consulta SQL con JOIN para obtener los estilos y sus tipos
        const [rows] = await connection.execute(`
            SELECT 
                ora_tipo_estilos.tip_est_txt_nombre_tipo_estilo, 
                ora_estilos.est_txt_nombre_estilo 
            FROM 
                ora_estilos 
            JOIN 
                ora_tipo_estilos 
            ON 
                ora_estilos.est_int_id_tipo_estilo = ora_tipo_estilos.tip_est_int_id_tipo_estilo
            ORDER BY 
                ora_tipo_estilos.tip_est_txt_nombre_tipo_estilo
        `);

        // Estructurar la respuesta
        const response = {};
        rows.forEach(row => {
            const tipoEstilo = row.tip_est_txt_nombre_tipo_estilo;
            const nombreEstilo = row.est_txt_nombre_estilo;
            if (!response[tipoEstilo]) {
                response[tipoEstilo] = [];
            }
            response[tipoEstilo].push(nombreEstilo);
        });

        // Cerrar la conexión
        await connection.end();

        return {
            statusCode: 200,
            body: JSON.stringify(response)
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error al obtener datos' })
        };
    }
};