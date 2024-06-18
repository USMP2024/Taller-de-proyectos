const AWS = require('aws-sdk');
const crypto = require('crypto');
const mysql = require('mysql2/promise');

exports.handler = async (event, context) => {
    // Verificar si el cuerpo de la solicitud está presente y es un JSON válido
    if (!event.body) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Cuerpo de solicitud no válido.' })
        };
    }

    const { año, usr_int_id_usuario } = JSON.parse(event.body);

    // Validar campos requeridos
    if (!año || !usr_int_id_usuario) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Faltan campos obligatorios en la solicitud.' })
        };
    }

    // Configurar la fecha inicial y final del año
    const fechaInicial = `${año}-01-01`;
    const fechaFinal = `${año}-12-31`;

    // Configuración de la conexión a MySQL
    const connectionConfig = {
        host: 'rds-development-db.chu4imeus62g.us-east-1.rds.amazonaws.com',
        user: 'admindev',
        password: 'passworddev',
        database: 'db_cloud'
    };

    try {
        const connection = await mysql.createConnection(connectionConfig);

        // Consulta para buscar datos en la tabla ora_ventas y hacer join con ora_productos
        const selectQuery = `
            SELECT 
                MONTH(v.ven_val_fecha_venta) AS mes,
                SUM(p.pro_val_precio_producto) AS ventas_totales
            FROM ora_ventas v
            JOIN ora_productos p ON v.ven_int_id_producto = p.pro_int_id_producto
            WHERE YEAR(v.ven_val_fecha_venta) = ?
            AND p.pro_int_id_contribuidor = ?
            GROUP BY MONTH(v.ven_val_fecha_venta)`;

        // Ejecutar la consulta con el año y el usuario proporcionados
        const [rows] = await connection.execute(selectQuery, [año, usr_int_id_usuario]);

        // Cerrar conexión a MySQL
        await connection.end();

        return {
            statusCode: 200,
            'headers': {
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ ventasPorMes: rows })
        };
    } catch (dbError) {
        console.error('Error en la consulta a la base de datos:', dbError);
        return {
            statusCode: 500,
            'headers': {
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ message: 'Error en la consulta a la base de datos.' })
        };
    }
};
