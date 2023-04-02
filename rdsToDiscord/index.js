// Load the required libraries
const AWS = require('aws-sdk');
const Discord = require('discord.js');

// Create an instance of the RDS Data Service
const rdsDataService = new AWS.RDSDataService({region: 'your-aws-region'});

// Define the database and table name
const dbOptions = {
  resourceArn: 'your-rds-resource-arn',
  secretArn: 'your-rds-secret-arn',
  database: 'your-database-name',
  sql: 'SELECT * FROM your-table-name WHERE date > :dateParam',
  parameters: [
    {name: 'dateParam', value: {stringValue: '2022-01-01'}}
  ]
};

// Define the Discord webhook URL and channel ID
const webhookUrl = 'your-discord-webhook-url';
const channelId = 'your-discord-channel-id';

exports.handler = async (event, context, callback) => {
  try {
    // Execute the SQL statement using the RDS Data Service
    const result = await rdsDataService.executeStatement(dbOptions).promise();

    // Create a new Discord webhook client
    const webhookClient = new Discord.WebhookClient({url: webhookUrl});

    // Filter the rows based on the date condition
    const filteredRows = result.records.filter(record => {
      const dateValue = record[1].stringValue; // assuming date column is at index 1
      return new Date(dateValue) > new Date('2022-01-01'); // replace the date string with your actual value
    });

    // Send each filtered row as a message to the Discord channel
    filteredRows.forEach(row => {
      const message = `Row ${row[0].longValue}: ${row[1].stringValue} - ${row[2].stringValue}`; // assuming columns 0, 1, and 2 contain the row number, date, and message respectively
      webhookClient.send(message, {username: 'AWS RDS Bot', avatarURL: 'https://i.imgur.com/4M34hi2.png', files: []});
    });

    callback(null, 'Messages sent successfully');
  } catch (error) {
    console.error(error);
    callback(error);
  }
};
