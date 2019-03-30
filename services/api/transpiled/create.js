"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.main = main;

var _uuid = _interopRequireDefault(require("uuid"));

var dynamoDbLib = _interopRequireWildcard(require("./libs/dynamodb-lib"));

var _responseLib = require("./libs/response-lib");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function main(event, context) {
  const data = JSON.parse(event.body); // process.env is accessing the environment variables at runtime, so the IDE throws a warning
  // noinspection JSUnresolvedVariable

  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: _uuid.default.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call('put', params);
    return (0, _responseLib.success)(params.Item);
  } catch (e) {
    return (0, _responseLib.failure)({
      status: false
    });
  }
}