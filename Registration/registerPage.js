const express = require("express");
const cors = require("cors");
const { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb');
// Create a DynamoDB client instance
const dynamodbClient = new DynamoDBClient({
    region: 'ap-south-1',
    credentials: {
      accessKeyId: '-',
      secretAccessKey: '-'
    }
  }); 
const app = express();
app.use(cors());
app.use(express.json());
app.post('/register', async(req, res) => {
  const { email } = req.body;

  const putItemCommand = new PutItemCommand({
    TableName: 'Table',
    Item: {
      'userid': { S: email }
    }
  });
  try {
    await dynamodbClient.send(putItemCommand);
    console.log('Email ID saved successfully');
    res.status(200).json({ message: 'Email ID saved successfully' });
  } catch (error) {
    console.error('Error saving email ID to DynamoDB:', error);
    res.status(500).json({ error: 'Failed to save email ID' });
  }
});

app.listen(4000, () => {
    console.log("Listening on 4000");
});
