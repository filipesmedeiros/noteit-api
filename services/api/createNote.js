import uuid from 'uuid';
import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context) {
    const data = JSON.parse(event.body);

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
        // Currently returning nothing back
        return success({ status: true });
    } catch(err) {
        console.log(err);

        return failure({ status: false });
    }
}
