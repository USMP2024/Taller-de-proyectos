// Importar el módulo mysql2 para conectarse a MySQL
const mysql = require('mysql2/promise');

// Función principal de Lambda
exports.handler = async (event, context) => {
    // Obtener el parámetro de producto desde la url ejemplo: ../intipacha?productoid=4
    const producto = event.queryStringParameters.productoid;

    // Configurar la conexión a la base de datos MySQL en AWS RDS
    const connection = await mysql.createConnection({
        host: 'rds-development-db.chu4imeus62g.us-east-1.rds.amazonaws.com',
        user: 'admindev',
        password: 'passworddev',
        database: 'db_cloud'
    });

    try {
        // Consulta SQL para seleccionar los datos de las subcategorías
        const [rows] = await connection.execute('SELECT sub_int_id_subcategoria, sub_txt_nombre_subcategoria, sub_txt_descripcion_subcategoria, sub_int_id_tipo FROM ora_subcategorias s INNER JOIN ora_productos p ON p.pro_int_id_producto = s.sub_int_id_tipo WHERE p.pro_int_id_producto = ?', [producto]);

        // Procesar los resultados y generar la respuesta
        const subcategorias = rows.map(row => ({
            id_subcategoria: row.sub_int_id_subcategoria,
            nombre_subcategoria: row.sub_txt_nombre_subcategoria,
            descripcion_subcategoria: row.sub_txt_descripcion_subcategoria,
            id_tipo: row.sub_int_id_tipo
        }));

        return {
            statusCode: 200,
            'headers': {
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(subcategorias)
        };
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        return {
            statusCode: 500,
            'headers': {
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ error: 'Error interno del servidor' })
        };
    } finally {
        // Cerrar la conexión a la base de datos
        await connection.end();
    }
};