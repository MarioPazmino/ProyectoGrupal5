const AWS = require('aws-sdk');
const { v4 } = require('uuid');
exports.createProduct = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { name, description, price } = JSON.parse(event.body);
  console.log("Datos recibidos:", { name, description, price });
  const createdAt = new Date();
  const ProductID = v4();

  const newProduct = {
    ProductID,
    Name: name,
    Description: description,
    Price: price,
    CreatedAt: createdAt.toISOString(),
  };
  try {
    await dynamodb
      .put({
        TableName: "Grupo5TableNew",  
        Item: newProduct,
      }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(newProduct),
    };
  } catch (error) {
    console.error("Error al crear el producto:", error);
    return {statusCode: 500,
      body: JSON.stringify({ message: "Error interno del servidor", error: error.message }),
    };
  }
};
