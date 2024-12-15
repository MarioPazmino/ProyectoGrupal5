
const AWS = require("aws-sdk");

exports.getProducts = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const result = await dynamodb.scan({
    TableName: "Grupo5TableNew",  
  }).promise();
 
  const products = result.Items;  
  return {
    statusCode: 200,
    body: JSON.stringify({ products }),
  };
};