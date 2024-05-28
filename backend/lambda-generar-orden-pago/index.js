const mercadopago = require('mercadopago');
const mysql = require('mysql2/promise');


mercadopago.configure({
  access_token: 'TEST-1563637811256460-032009-3e33ecc00169eca40dc41a4340928514-300692119'
});


exports.handler = async (event, context) => {
  
  const connection = await mysql.createConnection({
    host: 'rds-development-db.chu4imeus62g.us-east-1.rds.amazonaws.com',
    user: 'admindev',
    password: 'passworddev',
    database: 'db_cloud'
  });

  try {
   
    const { id_usuario, titulo, cantidad, montoSoles } = JSON.parse(event.body);

    
    const preference = {
      items: [
        {
          title: titulo,
          quantity: cantidad, 
          currency_id: 'PEN',
          unit_price: montoSoles 
        }
      ]
    };

    const response = await mercadopago.preferences.create(preference);

    
    const init_point = response.body.init_point;

    
    const [result] = await connection.execute(
      'INSERT INTO ora_checkout_cliente (id_usuario, titulo, cantidad, monto_soles, init_point) VALUES (?, ?, ?, ?, ?)',
      [id_usuario, titulo, cantidad, montoSoles, init_point]
    );

    
    await connection.end();

   
    return {
      statusCode: 200,
      body: JSON.stringify({
        init_point: init_point
      })
    };
  } catch (error) {
    console.error('Hubo un error al procesar la solicitud:', error);

   
    await connection.end();

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Hubo un error al procesar la solicitud'
      })
    };
  }
};
