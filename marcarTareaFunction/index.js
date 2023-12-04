// Include the AWS SDK module
const AWS = require('aws-sdk');
// Instantiate a DynamoDB document client with the SDK
let dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  // Create the parameters for the DynamoDB update operation
  const params = {
    TableName: 'gestorTareasDatabase',
    Key: {
      'ID': event.idTask
    },
    UpdateExpression: 'SET toggle = :toggleValue',
    ExpressionAttributeValues: {
      ':toggleValue': event.toggle
    },
    ReturnValues: 'ALL_NEW'
  };

  try {
    // Use await to ensure the update operation completes before continuing
    const result = await dynamodb.update(params).promise();

    // Create a response object indicating successful update
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Attributes)
    };
    return response;
  } catch (error) {
    // If an error occurs, create a response object indicating the error
    const response = {
      statusCode: 500,
      body: JSON.stringify('Error al actualizar el atributo toggle')
    };
    return response;
  }
};