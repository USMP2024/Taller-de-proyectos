const mercadopago = require('mercadopago');

// Función para crear una orden de pago
exports.handler = async (event, context) => {
  // Configurar credenciales de MercadoPago
  mercadopago.configure({
    access_token: 'TEST-6179268364930701-060218-99ac3408d16d460230c77ba95ac00634-1444186216'
  });

  try {
    // Obtener parámetros del evento
    const { titulo, cantidad, montoSoles } = JSON.parse(event.body);

    // Crear una preferencia de pago
    const preference = {
      items: [
        {
          title: titulo, // Título recibido
          quantity: cantidad, // Cantidad recibida
          currency_id: 'PEN', // Moneda en soles
          unit_price: montoSoles // Monto en soles recibido
        }
      ]
    };

    const response = await mercadopago.preferences.create(preference);

    // Obtener el enlace de pago (init_point)
    const init_point = response.body.init_point;

    // Enviar el enlace de pago como respuesta
    return {
      statusCode: 200,
      body: JSON.stringify({
        init_point: init_point
      })
    };
  } catch (error) {
    console.error('Hubo un error al procesar la solicitud:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Hubo un error al procesar la solicitud'
      })
    };
  }
};
