const AWS = require('aws-sdk');
const crypto = require('crypto');
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

exports.handler = async (event) => {
    const { username, password } = JSON.parse(event.body);

    // Configuración de Cognito
    const clientId = '558o7dr2cg51jrb71ilvhj08vj';
    const clientSecret = '17sioav7qnoldni8eiiatu56jtlrnr0n4qknqjj5522d2eh1k7na';

    // Calcula el hash secreto
    const message = username + clientId;
    const hmac = crypto.createHmac('sha256', clientSecret);
    hmac.update(message);
    const secretHash = hmac.digest('base64');

    const params = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: clientId,
        AuthParameters: {
            'USERNAME': username,
            'PASSWORD': password,
            'SECRET_HASH': secretHash // Incluye el hash secreto en los parámetros de autenticación
        }
    };

    try {
        const data = await cognitoIdentityServiceProvider.initiateAuth(params).promise();
        
        // Si el inicio de sesión es exitoso, devolver el token de acceso
        return {
            statusCode: 200,
            body: JSON.stringify({ accessToken: data.AuthenticationResult.AccessToken })
        };
    } catch (error) {
        // Manejar errores de inicio de sesión
        console.log("Error al iniciar sesión:", error);
        return {
            statusCode: 401,
            body: JSON.stringify({ message: 'Credenciales inválidas' })
        };
    }
};
