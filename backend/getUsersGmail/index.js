const mysql = require('mysql2/promise');

// Configuración directa (no recomendada para producción)
const config = {
    dbHost: 'taller.cnqcwuwg8ykf.us-east-1.rds.amazonaws.com',
    dbUser: 'JoseDavid',
    dbPassword: 'perales_123',
    dbName: 'primera'
};

// Función para crear una conexión a la base de datos MySQL
async function createConnection() {
    return mysql.createConnection({
        host: config.dbHost,
        user: config.dbUser,
        password: config.dbPassword,
        database: config.dbName
    });
}

exports.handler = async (event) => {
    let response;


    try {
        const connection = await createConnection();
        

        // Consulta para seleccionar todos los usuarios
        const [results] = await connection.execute("SELECT * FROM Usuarios LIKE '%gmail%'");
        
        // Cierra la conexión a la base de datos
        await connection.end();

        response = {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin": "*", // Ajusta según tu política de CORS
            },
            body: JSON.stringify(results), // Devuelve todos los usuarios
        };
    } catch (error) {
        console.error(error);
        response = {
            statusCode: 500,
            body: JSON.stringify({ message: "Error al obtener los usuarios" }),
        };
    }

    return response;
};
