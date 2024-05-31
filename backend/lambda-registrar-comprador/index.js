const AWS = require('aws-sdk');
const mysql = require('mysql2/promise');
const crypto = require('crypto');

const handler = async (event) => {
    const { userName, lastnames, password, email } = event.body;
    console.log(password);

    if (!userName || !lastnames || !email || !password) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Faltan campos obligatorios en la solicitud.' })
        };
    }

    const connection = await mysql.createConnection({
        host: 'rds-development-db.chu4imeus62g.us-east-1.rds.amazonaws.com',
        user: 'admindev',
        password: 'passworddev',
        database: 'db_cloud'
    });

    const legalName = `${userName} ${lastnames.trim()}`;
    const legalNameArray = legalName.split(' ');
    if (legalNameArray.length < 3) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "No se introdujo el nombre completo (nombre, apellido paterno, apellido materno) o las separaciones necesarias, (ej. Alberto Castillo Mendoza)" })
        };
    }

    if (!validatePassword(password)) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "La contraseña debe tener por lo menos 8 caracteres, contener al menos un carácter especial y una letra minúscula." })
        };
    }

    if (!validateEmail(email)) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Correo electrónico no válido." })
        };
    }

    try {
        const query = `SELECT * FROM ora_usuarios WHERE usr_txt_nombre_legal = ?`;
        const [rows] = await connection.execute(query, [legalName]);

        if (rows.length > 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: `El con nombre legal ${legalName} ya se encuentra registrado` })
            };
        }

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: `ERROR BUSCAR USUARIO: ${error}` })
        };
    }

    try {
        const query = `SELECT * FROM ora_usuarios WHERE usr_txt_correo_electronico = ?`;
        const [rows] = await connection.execute(query, [email]);

        if (rows.length > 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "El usuario ya se encuentra registrado" })
            };
        }

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: `ERROR BUSCAR USUARIO: ${error}` })
        };
    }

    let usuarioId;
    try {
        const query = `INSERT INTO ora_usuarios (usr_txt_nombre_usuario, usr_txt_apellido_usuario, usr_txt_nombre_legal, usr_txt_correo_electronico, usr_txt_contrasena, usr_val_fecha_registro, usr_txt_tipo_usuario) VALUES (?,?,?,?,?,?,?)`;
        const rolValue = 'Cliente';
        const currentDate = new Date();

        const [result] = await connection.execute(query, [userName, lastnames, legalName, email, password, currentDate, rolValue]);

        console.log(result)
        usuarioId = result.insertId;
        console.log(usuarioId + " " + typeof(usuarioId))

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: `ERROR INSERT: ${error}` })
        };
    }

    const cognito = new AWS.CognitoIdentityServiceProvider();
    const userPoolId = 'us-east-1_LiU5u70f0';
    const groupName = 'Compradores';
    const clientId = '36d4j58hqarae04v8408v4phk';
    const clientSecret = '1kscic77oe9j79jlbqbsuucav0b4aqsphu137ho2pimpsm8bflrp';

    const message = email + clientId;
    const hmac = crypto.createHmac('sha256', clientSecret);
    hmac.update(message);
    const secretHash = hmac.digest('base64');

    const rolValue = 'Cliente';
    try {
        const signUpParams = {
            ClientId: clientId,
            Username: email,
            Password: password,
            SecretHash: secretHash,
            UserAttributes: [
                { Name: 'email', Value: email },
                { Name: 'custom:idUsuario', Value: usuarioId.toString()},
                { Name: 'custom:rolUsuario', Value: rolValue }
            ]
        };
        const signUpResponse = await cognito.signUp(signUpParams).promise();
        const userSub = signUpResponse.UserSub;

        const addUserToGroupParams = {
            UserPoolId: userPoolId,
            Username: userSub,
            GroupName: groupName
        };
        await cognito.adminAddUserToGroup(addUserToGroupParams).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Usuario registrado exitosamente", usuarioId, rolValue })
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: `ERROR: ${error}` })
        };
    }
};

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    const re = /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    return re.test(password);
}

exports.handler = handler;
