const express = require('express');
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
const cors = require('cors');
const app = express();
app.use(cors());
// Configure AWS SDK
const client = new SESClient({
  region: 'ap-south-1',
  credentials: {
    accessKeyId: 'AKIAX3GW77ZAVZ3S64W2',
    secretAccessKey: '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'
  } 
});
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Endpoint to send an email
app.post('/sendEmail', async (req, res) => {
 // const {mailId,objectUrl} = req.body;
  try {
    const params = {
      Destination: {
        ToAddresses: ['varunparab7@gmail.com'] // Replace with recipient email address
      },
      Message: {
        Body: {
          Text: {
            Data: 'hii' // Replace with the email body
          }
        },
        Subject: {
          Data: 'Newsletter' // Replace with the email subject
        }
      },
      Source: 'varunparab7@gmail.com' // Replace with sender email address
    };

    const command = new SendEmailCommand(params);
    await client.send(command);

    res.send('Email sent successfully!');
  } catch (err) {
    console.error('Unable to send email:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(4002, () => {
  console.log('Server started on port 4002');
});
