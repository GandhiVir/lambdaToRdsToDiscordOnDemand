// Load the AWS SDK
const AWS = require('aws-sdk');

// Create an instance of the RDS Data Service
const rdsDataService = new AWS.RDSDataService({region: 'your-aws-region'});

// Define the database and table name
const dbOptions = {
  resourceArn: 'your-rds-resource-arn',
  secretArn: 'your-rds-secret-arn',
  database: 'your-database-name',
  sql: 'INSERT INTO your-table-name (column1, column2) VALUES (:column1, :column2)',
  parameters: [
    {name: 'column1', value: {stringValue: 'Value 1'}},
    {name: 'column2', value: {stringValue: 'Value 2'}}
  ]
};

exports.handler = async (event, context, callback) => {
  try {
    // Execute the SQL statement using the RDS Data Service
    const result = await rdsDataService.executeStatement(dbOptions).promise();
    console.log(result);
    callback(null, 'Data inserted successfully');
  } catch (error) {
    console.error(error);
    callback(error);
  }
};
