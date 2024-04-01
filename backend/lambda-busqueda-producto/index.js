const mysql = require('mysql2');

const handler = async (event) =>  {
    try {
        // Crear una conexión a la base de datos
        const connection = await mysql.createConnection({
            host: 'rds-development-db.chu4imeus62g.us-east-1.rds.amazonaws.com',
            user: 'admindev',
            password: 'passworddev',
            database: 'db_cloud'
        });

        // Consulta SQL para buscar un producto con una palabra clave '
        const consulta = "SELECT pro_txt_nombre_producto FROM ora_productos WHERE pro_txt_nombre_producto LIKE 'Ceviche%'";

        // Ejecutar la consulta SQL
        const resultados = await new Promise((resolve, reject) => {
            connection.query(consulta, function (error, results, fields) {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                return resolve(results);
            });
        });

        // Cerrar la conexión a la base de datos después de realizar la consulta
        connection.end();

    } catch (error) {
        // Manejar cualquier error que ocurra durante la ejecución
        console.error("Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error" })
        };
    }
};


module.exports = { handler };