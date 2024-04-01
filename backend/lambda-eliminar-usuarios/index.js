// Importacion de la base de datos
import mysql from 'mysql'

export const handler = async (event) => {
  
  
  const idusuario = event.queryStringParameters.idusuario
  
  //Conexion a la base de datos
  const connection = await mysql.createConnection({
            host: 'rds-development-db.chu4imeus62g.us-east-1.rds.amazonaws.com',
            user: 'admindev',
            password: 'passworddev',
            database: 'db_cloud'

  })
  
  //Consulta para eliminar usuario
  const consulta = "DELETE FROM ora_usuarios WHERE usr_int_id_usuario = " + connection.escape(idusuario)
  
  const resultados = await new Promise((resolve,reject)=>{
    
    connection.query(consulta,function(error,results,fields){
        if(error){
          reject(error)
          return error
        }
        resolve(results)
    })
    
  })
  
  console.log(resultados)
  

    const response = {
      statusCode: 200,
      body: JSON.stringify("Se elimino correctamente el producto", resultados),
    };
    return response;
};