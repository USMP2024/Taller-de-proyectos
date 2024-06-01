const mysql = require('mysql2/promise');

exports.handler = async (event) => {
    const { sol_int_id_usuario, TipoSolicitud } = JSON.parse(event.body);
    let tipoSolicitudQuery;

    // Definir el tipo de archivo basado en el tipo de solicitud
    if (TipoSolicitud === 'Videos') {
        tipoSolicitudQuery = "('video/mp4')";
    } else if (TipoSolicitud === 'Imagenes') {
        tipoSolicitudQuery = "('model/obj', 'image/png', 'image/jpeg')";
    } else {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Tipo de solicitud no válido' })
        };
    }

    try {
        // Crear una conexión a la base de datos
        const connection = await mysql.createConnection({
            host: 'rds-development-db.chu4imeus62g.us-east-1.rds.amazonaws.com',
            user: 'admindev',
            password: 'passworddev',
            database: 'db_cloud'
        });

        // Consultar la base de datos para obtener los nombres de archivo y estados de aprobación
        const [rows] = await connection.query(
            `SELECT sol_txt_nombre_archivo, sol_txt_estado_aprobacion 
             FROM ora_solicitudes_aprobacion 
             WHERE sol_int_id_usuario = ? 
             AND sol_txt_tipo_imagen IN ${tipoSolicitudQuery}`, 
             [sol_int_id_usuario]
        );

        // Inicializar los contadores y la lista de archivos
        let counts = {
            Aprobados: { count: 0, archivos: [] },
            Pendientes: { count: 0, archivos: [] },
            NoEnviados: { count: 0, archivos: [] }
        };

        let archivosInfo = [];

        // Procesar los resultados para contar por estado de aprobación y recopilar nombres de archivos
        rows.forEach(row => {
            const archivo = row.sol_txt_nombre_archivo;
            const estado = row.sol_txt_estado_aprobacion.toLowerCase();

            archivosInfo.push({
                sol_txt_nombre_archivo: archivo,
                sol_txt_estado_aprobacion: estado
            });

            if (estado === 'aprobada') {
                counts.Aprobados.count++;
                counts.Aprobados.archivos.push(archivo);
            } else if (estado === 'pendiente') {
                counts.Pendientes.count++;
                counts.Pendientes.archivos.push(archivo);
            } else if (estado === 'no enviado') {
                counts.NoEnviados.count++;
                counts.NoEnviados.archivos.push(archivo);
            }
        });

        // Calcular el total
        const Total = counts.Aprobados.count + counts.Pendientes.count + counts.NoEnviados.count;

        // Construir la respuesta
        const responseBody = {
            sol_int_id_usuario,
            TipoSolicitud,
            archivos: archivosInfo,
            total: {
                Aprobados: { count: counts.Aprobados.count },
                Pendientes: { count: counts.Pendientes.count },
                NoEnviados: { count: counts.NoEnviados.count },
                Total: Total
            }
        };

        const response = {
            statusCode: 200,
            body: JSON.stringify(responseBody, null, 2) // Formato de impresión legible
        };

        await connection.end();

        return response;
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error al conectar a la base de datos' })
        };
    }
};
//{ "body": "{\"sol_int_id_usuario\": 1, \"TipoSolicitud\": \"Imagenes\"}"
