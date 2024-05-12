const mysql = require('mysql2/promise');

// Función principal de Lambda
const handler = async (event, context) => {
    // Configurar la conexión a la base de datos MySQL en AWS RDS
    const connection = await mysql.createConnection({
        host: 'rds-development-db.chu4imeus62g.us-east-1.rds.amazonaws.com',
        user: 'admindev',
        password: 'passworddev',
        database: 'db_cloud'
    });

    const idProducto = event.idProducto;

    try {
        // Consulta SQL para seleccionar los datos de los productos, ordenados por contador de vistas
        const [rows] = await connection.execute(`SELECT P.pro_int_id_producto AS idProducto, 
        P.pro_txt_nombre_producto AS nombre_producto, 
        P.pro_txt_descripcion_producto AS descripcion_producto, 
        P.pro_int_contador_vistas AS contador_vistas, 
        P.pro_val_precio_producto AS precio_producto, 
        P.pro_txt_url_producto AS url_img_producto, 
        P.pro_int_id_artista AS id_artista,
        CONCAT(A.usr_txt_nombre_usuario, ' ', A.usr_txt_apellido_usuario) AS nombre_completo_artista
        FROM ora_productos P
        INNER JOIN ora_usuarios A ON P.pro_int_id_artista = A.usr_int_id_usuario
        WHERE P.pro_int_id_producto = ${idProducto};`);

        // Procesar los resultados y generar la respuesta

        console.log(rows)

        const producto = rows.map(row => ({
            id_producto: row.pro_int_id_producto,
        }));

        return {
            statusCode: 200,
            body: JSON.stringify(rows)
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

module.exports = {handler}