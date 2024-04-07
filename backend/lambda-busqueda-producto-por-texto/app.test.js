import { handler } from './index.js';

describe('Lambda listar clientes - Integración', () => {
  it('debería devolver una lista de clientes cuando la consulta es exitosa', async () => {
    const event = {}; // Ajusta esto según lo que tu función espere recibir
    const result = await handler(event);
    
    // Mostrar el resultado en la consola
    console.log("Resultado de la prueba:", result);

    expect(result.statusCode).toBe(200);
    // Asegúrate de que el resultado tenga la forma esperada. Este es un ejemplo básico.
    expect(result).toHaveProperty('listaUsuarios');
    expect(Array.isArray(result.listaUsuarios)).toBe(true);
    
    // Aquí podrías añadir más aserciones específicas, por ejemplo, verificar algunos de los usuarios devueltos si conoces datos exactos que esperar.
  });

  // Puedes añadir más pruebas para diferentes casos, como cuando la tabla está vacía, etc.
});
