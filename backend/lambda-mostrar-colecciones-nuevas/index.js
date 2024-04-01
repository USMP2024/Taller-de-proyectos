// Importar el módulo mysql2 para conectarse a MySQL
const mysql = require('mysql2/promise');

// Función principal de Lambda
exports.handler = async (event, context) => {
    // Configurar la conexión a la base de datos MySQL en AWS RDS
    const connection = await mysql.createConnection({
        host: 'rds-development-db.chu4imeus62g.us-east-1.rds.amazonaws.com',
        user: 'admindev',
        password: 'passworddev',
        database: 'db_cloud'
    });

    try {
        // Consulta SQL para seleccionar los datos de los productos, ordenados por contador de vistas
        const [rows] = await connection.execute('SELECT col_txt_nombre_coleccion, col_int_id_coleccion FROM ora_colecciones  WHERE fecha_registro = (SELECT MAX(fecha_registro) FROM ora_colecciones) ');

        // Procesar los resultados y generar la respuesta
        const coleccion = rows.map(row => ({
            id_coleccion: row.col_int_id_coleccion,
            id_nombre: row.col_txt_nombre_coleccion,
        }));

        return {
            statusCode: 200,
            body: JSON.stringify(coleccion)
        };
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error interno del servidor' })
        };
    } finally {
        // Cerrar la conexión a la base de datos
        await connection.end();
    }
};
