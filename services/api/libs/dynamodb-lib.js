// noinspection ES6CheckImport
import AWS from "aws-sdk";

// dynamoDb should be const, but WebStorm doesn't like it for some reason

export function query(params) {
    let dynamoDb = new AWS.DynamoDB.DocumentClient();

    return dynamoDb.query(params).promise();
}