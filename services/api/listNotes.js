import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context) {
    const params = {
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
        Limit: event.query.pageSize,
        ExclusiveStartKey: event.query.start
    };

    try {
        const result = await dynamoDbLib.query(params);
        // Return the matching list of items in response body

        let response = result.Items;

        if(result.LastEvaluatedKey)
            response.lastKey = result.LastEvaluatedKey;

        return success(response);
    } catch (e) {
        return failure({ status: false });
    }
}