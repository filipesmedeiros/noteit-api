import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context) {
    let params = {
        TableName: process.env.tableName,
        // 'KeyConditionExpression' defines the condition for the query
        // - 'userId = :userId': only return items with matching 'userId'
        //   partition key
        // 'ExpressionAttributeValues' defines the value in the condition
        // - ':userId': defines 'userId' to be Identity Pool identity id
        //   of the authenticated user
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': event.requestContext.identity.cognitoIdentityId
        },
        Limit: event.queryStringParameters.pageSize
    };

    const hasStartKey = () => event.queryStringParameters.start && event.queryStringParameters.start != null && event.queryStringParameters.start !== 'null';

    if(hasStartKey())
        params.ExclusiveStartKey = JSON.parse(event.queryStringParameters.start);

    try {
        const result = await dynamoDbLib.query(params);
        // Return the matching list of items in response body

        let response = {};
        response.notes = result.Items;

        if(hasStartKey())
            response.count = result.Count;

        if(result.LastEvaluatedKey)
            response.lastKey = result.LastEvaluatedKey;

        return success(response);
    } catch(e) {
        console.log(e);

        return failure({ status: false }, e.statusCode);
    }
}