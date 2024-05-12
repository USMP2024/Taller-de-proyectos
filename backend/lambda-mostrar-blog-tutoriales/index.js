/*
  - Establece una conexión con DynamoDB utilizando el cliente DynamoDBDocumentClient.
*/
import { DynamoDBClient } from "@aws-sdk/client-dynamodb"; // Importa el cliente DynamoDB
import {
  DynamoDBDocumentClient,
  GetCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb"; // Importa comandos y cliente para trabajar con DynamoDB
import { randomUUID } from "crypto"; // Importa la función randomUUID para generar UUID aleatorios

// Crea un cliente DynamoDBDocumentClient a partir de un DynamoDBClient
const ddbDocClient = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: "us-east-1" })
);

// Función principal que maneja las solicitudes
export const handler = async (event) => {
  try {
    // Escanea la tabla "blogs" y obtiene todos los elementos
    const data = await ddbDocClient.send(
      new ScanCommand({
        TableName: "blogs",
      })
    );

    // Devuelve los datos obtenidos con un código de estado 200
    return {
      statusCode: 200,
      body: JSON.stringify(data.Items),
    };
  } catch (error) {
    // Maneja cualquier error y devuelve un mensaje de error con un código de estado 500
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
