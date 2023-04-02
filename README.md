# lambdaToRdsToDiscordOnDemand

The repository contains a template for 
1. inserting data into AWS RDS through lambda
2. sending message to a discord channel by reading data from RDS table

## Development

1. Depending on your RDS Table and Discord channel, replace the dummy value with the correct variables.
2. Run npm install
3. Zip all the files so that index.js in the top folder
4. Deploy to AWS and create a Lambda function using the zip file

That's all!