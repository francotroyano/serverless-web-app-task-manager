// Include the AWS SDK module
const AWS = require('aws-sdk');
// Instantiate a DynamoDB document client with the SDK
let dynamodb = new AWS.DynamoDB.DocumentClient();


exports.handler = async (event) => {
  // Create the parameters for the DynamoDB scan operation
  const params = {
    TableName: 'gestorTareasDatabase'
  };

  try {
    // Use await to ensure the scan operation completes before continuing
    const result = await dynamodb.scan(params).promise();

    // Create a response object with the scanned items
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items)
    };
    return response;
  } catch (error) {
    // If an error occurs, create a response object indicating the error
    const response = {
      statusCode: 500,
      body: JSON.stringify('Error al cargar los elementos de la tabla DynamoDB')
    };
    return response;
  }
};