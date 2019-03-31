let dynamoDbLib = require('./libs/dynamodb-lib');
let { success, failure } = require('./libs/response-lib');

export async function main(event, context) {
    // process.env is accessing the environment variables at runtime, so the IDE throws a warning
    // noinspection JSUnresolvedVariable
    const params = {
        TableName: process.env.tableName,
        // 'Key' defines the partition key and sort key of the item to be removed
        // - 'userId': Identity Pool identity id of the authenticated user
        // - 'noteId': path parameter
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        }
    };

    try {
        const result = await dynamoDbLib.call('delete', params);
        return success({ status: true });
    } catch (e) {
        return failure({ status: false });
    }
}
