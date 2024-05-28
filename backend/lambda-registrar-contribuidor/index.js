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

    let { nombre, apellido, correo, contrasena } = JSON.parse(event.body);

    // Validar campos requeridos
    if (!nombre || !apellido || !correo || !contrasena) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Faltan campos obligatorios en la solicitud.' })
        };
    }

    const nombreCompleto = `${nombre} ${apellido}`;

    // Configuración de Cognito
    const cognito = new AWS.CognitoIdentityServiceProvider();
    const userPoolId = 'us-east-1_YcnohWASY';
    const groupName = 'compradores-arte';
    const clientId = '558o7dr2cg51jrb71ilvhj08vj';
    const clientSecret = '17sioav7qnoldni8eiiatu56jtlrnr0n4qknqjj5522d2eh1k7na';

    // Calcula el hash secreto
    const message = correo + clientId;
    const hmac = crypto.createHmac('sha256', clientSecret);
    hmac.update(message);
    const secretHash = hmac.digest('base64');

    // Configuración de conexión a MySQL utilizando async/await
    try {
        const connection = await mysql.createConnection({
            host: 'rds-development-db.chu4imeus62g.us-east-1.rds.amazonaws.com',
            user: 'admindev',
            password: 'passworddev',
            database: 'db_cloud'
        });

        // Registro de usuario en Cognito
        const signUpParams = {
            ClientId: clientId,
            Username: correo,
            Password: contrasena,
            SecretHash: secretHash,
            UserAttributes: [
                { Name: 'email', Value: correo }
            ]
        };
        const signUpResponse = await cognito.signUp(signUpParams).promise();
        const userSub = signUpResponse.UserSub;

        // Guardar datos en MySQL
        const insertQuery = `INSERT INTO ora_usuarios (usr_txt_nombre_usuario, usr_txt_correo_electronico, usr_txt_contrasena, usr_txt_tipo_usuario) VALUES (?, ?, ?, ?)`;
        const rolValue = 'Contribuidor'; // Valor ENUM válido
        await connection.execute(insertQuery, [nombreCompleto, correo, contrasena, rolValue]);

        // Añadir usuario al grupo en Cognito
        const addUserToGroupParams = {
            UserPoolId: userPoolId,
            Username: userSub,
            GroupName: groupName
        };
        await cognito.adminAddUserToGroup(addUserToGroupParams).promise();

        // Cerrar conexión a MySQL
        await connection.end();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Usuario registrado y añadido al grupo exitosamente.' })
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Usuario registrado' })
        };
    }
};
