const { Resend } = require('resend');

exports.handler = async (event) => {
    try {
        // Parsear los datos del evento POST
        const requestBody = JSON.parse(event.body);
        
        // Verificar que se proporcionen los parámetros requeridos
        const { from, to, subject, html } = requestBody;
        if (!from || !to || !subject || !html) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Los parámetros 'from', 'to', 'subject' y 'html' son obligatorios." })
            };
        }

        // Configurar la instancia de Resend
        const resend = new Resend('re_J1Cjt3ix_FSL5P9MFK9j41pfwRcd4H12P');

        // Enviar el correo electrónico
        await resend.emails.send({
            from: from,
            to: to,
            subject: subject,
            html: html
        });

        // Respuesta exitosa
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Correo electrónico enviado exitosamente." })
        };
    } catch (error) {
        // Manejar errores
        console.error("Error al enviar el correo electrónico:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error interno del servidor.", error: error.message })
        };
    }
};