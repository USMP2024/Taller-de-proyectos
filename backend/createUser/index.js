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

    console.log(event.body);
    console.log(connection);

    try {
        const { nombre, email } = JSON.parse(event.body);
        const result = await new Promise((resolve, reject) => {
            const query = 'INSERT INTO Usuarios (nombre, email) VALUES (?, ?)';
            connection.query(query, [nombre, email], (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });
        
        response = {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin": "*", // Ajusta según tu política de CORS
            },
            body: JSON.stringify({ message: "Usuario creado con éxito", id: result.insertId }),
        };
    } catch (error) {
        console.error(error);
        response = {
            statusCode: 500,
            body: JSON.stringify({ message: "Error al crear el usuario" }),
        };
    }
    
    return response;
};