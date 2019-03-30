"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.main = main;

var _stripe = _interopRequireDefault(require("stripe"));

var _billingLib = require("./libs/billing-lib");

var _responseLib = require("./libs/response-lib");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function main(event, context) {
  const {
    storage,
    source: stripeToken
  } = JSON.parse(event.body);
  const price = (0, _billingLib.calculateCost)(storage);
  const description = 'NoteIt charge'; // Load our secret key from the  environment variables

  const stripe = (0, _stripe.default)(process.env.stripeSecretKey);
  /**
   * @var stripe
   * @property stripe.charges
   */

  try {
    await stripe.charges.create({
      source: stripeToken,
      amount: price,
      description,
      currency: 'eur'
    });
    return (0, _responseLib.success)({
      status: true
    });
  } catch (e) {
    return (0, _responseLib.failure)({
      message: e.message
    });
  }
}