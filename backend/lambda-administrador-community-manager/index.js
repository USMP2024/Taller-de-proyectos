'use strict';

const AWS = require('aws-sdk');
let dynamo = new AWS.DynamoDB.DocumentClient();

require('aws-sdk/clients/apigatewaymanagementapi'); // Importando módulo API Gateway Management API

const CHATCONNECTION_TABLE = 'chatIdTable'; // Constante para el nombre de la tabla DynamoDB

const successfullResponse = {
  statusCode: 200,
  body: 'todo está bien'
};

// Controlador para eventos de conexión WebSocket
module.exports.connectionHandler = (event, context, callback) => {
  console.log(event);

  if (event.requestContext.eventType === 'CONNECT') {
    // Manejar la conexión
    addConnection(event.requestContext.connectionId)
      .then(() => {
        callback(null, successfullResponse);
      })
      .catch(err => {
        console.log(err);
        callback(null, JSON.stringify(err));
      });
  } else if (event.requestContext.eventType === 'DISCONNECT') {
    // Manejar la desconexión
    deleteConnection(event.requestContext.connectionId)
      .then(() => {
        callback(null, successfullResponse);
      })
      .catch(err => {
        console.log(err);
        callback(null, {
          statusCode: 500,
          body: 'Error al conectar: ' + JSON.stringify(err)
        });
      });
  }
};

// Controlador predeterminado para eventos WebSocket que no coinciden con ningún controlador específico

module.exports.defaultHandler = (event, context, callback) => {
  console.log('Se llamó a defaultHandler');
  console.log(event);

  callback(null, {
    statusCode: 200,
    body: 'defaultHandler'
  });
};

// Controlador para enviar mensajes a todos los clientes conectados
module.exports.sendMessageHandler = (event, context, callback) => {
  sendMessageToAllConnected(event).then(() => {
    callback(null, successfullResponse)
  }).catch (err => {
    callback(null, JSON.stringify(err));
  });
}

// Función para enviar un mensaje a todos los clientes conectados
const sendMessageToAllConnected = (event) => {
  return getConnectionIds().then(connectionData => {
    return connectionData.Items.map(connectionId => {
      return send(event, connectionId.connectionId);
    });
  });
}

// Función para obtener todos los IDs de conexión de la tabla DynamoDB
const getConnectionIds = () => {  
  const params = {
    TableName: CHATCONNECTION_TABLE,
    ProjectionExpression: 'connectionId'
  };

  return dynamo.scan(params).promise();
}

// Función para enviar un mensaje a una conexión específica
const send = (event, connectionId) => {
  const body = JSON.parse(event.body);
  const postData = body.data;  

  const endpoint = event.requestContext.domainName + "/" + event.requestContext.stage;
  const apigwManagementApi = new AWS.ApiGatewayManagementApi({
    apiVersion: "2024-03-28",
    endpoint: endpoint
  });

  const params = {
    ConnectionId: connectionId,
    Data: postData
  };
  return apigwManagementApi.postToConnection(params).promise();
};

// Función para agregar un nuevo ID de conexión a la tabla DynamoDB
const addConnection = connectionId => {
  const params = {
    TableName: CHATCONNECTION_TABLE,
    Item: {
      connectionId: connectionId 
    }
  };

  return dynamo.put(params).promise();
};

// Función para eliminar un ID de conexión de la tabla DynamoDB
const deleteConnection = connectionId => {
  const params = {
    TableName: CHATCONNECTION_TABLE,
    Key: {
      connectionId: connectionId 
    }
  };

  return dynamo.delete(params).promise();
};
