"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.main = main;

var dynamoDbLib = _interopRequireWildcard(require("./libs/dynamodb-lib"));

var _responseLib = require("./libs/response-lib");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

async function main(event, context) {
  // process.env is accessing the environment variables at runtime, so the IDE throws a warning
  // noinspection JSUnresolvedVariable
  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    }
  };

  try {
    const result = await dynamoDbLib.call('get', params);

    if (result.Item) {
      // Return the retrieved item
      return (0, _responseLib.success)(result.Item);
    } else {
      return (0, _responseLib.failure)({
        status: false,
        error: 'Item not found.'
      });
    }
  } catch (e) {
    console.log(e);
    return (0, _responseLib.failure)({
      status: false
    });
  }
}