const AWS = require('aws-sdk');
const crypto = require('crypto');
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

exports.handler = async (event) => {
    const { username, password } = JSON.parse(event.body);

    // Configuración de Cognito
    const clientId = '1i6e60046ghcsj1l3j8fqal9gm';
    const clientSecret = 'd0c07fu1jd830ekrts6lqd8fd3dns07mlbqjbcnbqcjjk5fnld0';

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
