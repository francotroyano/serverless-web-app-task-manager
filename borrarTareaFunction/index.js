// Include the AWS SDK module
const AWS = require('aws-sdk');
// Instantiate a DynamoDB document client with the SDK
let dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  // Create the parameters for the DynamoDB delete operation
  const params = {
    TableName: 'gestorTareasDatabase',
    Key: {
      'ID': event.idTask
    }
  };

  try {
    // Use await to ensure the delete operation completes before continuing
    await dynamodb.delete(params).promise();
    
    // Create a response object indicating successful deletion
    const response = {
      statusCode: 200,
      body: JSON.stringify(`Tarea con ID: ${event.idTask} eliminada}`)
    };
    return response;
  } catch (error) {
    // If an error occurs, create a response object indicating the error
    const response = {
      statusCode: 500,
      body: JSON.stringify('Error al eliminar la tarea')
    };
    return response;
  }
};