let uuid = require('uuid');
let dynamoDbLib = require('./libs/dynamodb-lib');
let { success, failure } = require('./libs/response-lib');

export async function main(event, context) {
    const data = JSON.parse(event.body);

    // process.env is accessing the environment variables at runtime, so the IDE throws a warning
    // noinspection JSUnresolvedVariable
    const params = {
        TableName: process.env.tableName,
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: uuid.v1(),
            content: data.content,
            attachment: data.attachment,
            createdAt: Date.now()
        }
    };

    try {
        await dynamoDbLib.call('put', params);
        return success(params.Item);
    } catch (e) {
        return failure({ status: false });
    }
}
