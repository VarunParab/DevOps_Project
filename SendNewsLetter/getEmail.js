const express = require('express');
const cors = require('cors');
const { DynamoDBClient, ScanCommand } = require('@aws-sdk/client-dynamodb');

// Create a DynamoDB client instance
const dynamodbClient = new DynamoDBClient({
  region: 'ap-south-1',
  credentials: {
    accessKeyId: '-',
    secretAccessKey: '-'
  }
});

// Create an Express application
const app = express();
app.use(cors());
// Parse JSON request body
app.use(express.json());
app.get('/getEmail', async (req, res) => {
  const getItemCommand = new ScanCommand({
    TableName: 'Table',
  });

  try {
    // Save the email ID to DynamoDB
    const response = await dynamodbClient.send(getItemCommand);
    console.log('Response from DynamoDB:', response.Items);
    const emailId = response.Items.map(item => item.userid.S);
    res.send(emailId);
  } catch (error) {
    console.error('Error response from DynamoDB:', error);
  }
});


// Start the server
app.listen(4001, () => {
  console.log('Server listening on port 4001');
});
