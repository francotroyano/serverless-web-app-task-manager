// Include the AWS SDK module
const AWS = require('aws-sdk');
// Instantiate a DynamoDB document client with the SDK
let dynamodb = new AWS.DynamoDB.DocumentClient();
// Define handler function, the entry point to our code for the Lambda service
exports.handler = async (event) => {
    // Create JSON object with parameters for DynamoDB and store in a variable
    let params = {
        TableName:'gestorTareasDatabase',
        Item: {
            'ID': event.idTask,
            'nameTask' : event.nameTask,
            'descriptionTask': event.descriptionTask,
            'toggle': event.toggle
        }
    };
    // Using await, make sure object writes to DynamoDB table before continuing execution
    const result = await dynamodb.put(params).promise();
    // Create a JSON object with our response and store it in a constant
    const response = {
        statusCode: 200,
        body: result.Attributes
    };
    // Return the response constant
    return response;
};