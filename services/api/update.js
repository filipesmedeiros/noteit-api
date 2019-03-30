"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.main = main;

var dynamoDbLib = _interopRequireWildcard(require("./libs/dynamodb-lib"));

var _responseLib = require("./libs/response-lib");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

async function main(event, context) {
  const data = JSON.parse(event.body); // process.env is accessing the environment variables at runtime, so the IDE throws a warning
  // noinspection JSUnresolvedVariable

  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: 'SET content = :content, attachment = :attachment',
    ExpressionAttributeValues: {
      ':attachment': data.attachment || null,
      ':content': data.content || null
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: 'ALL_NEW'
  };

  try {
    await dynamoDbLib.call('update', params);
    return (0, _responseLib.success)({
      status: true
    });
  } catch (e) {
    return (0, _responseLib.failure)({
      status: false
    });
  }
}