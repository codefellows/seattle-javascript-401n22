const Chance = require("chance");
const clientSqs = require("@aws-sdk/client-sqs");

const { SQSClient } = clientSqs;

const REGION = "us-west-2";
const sqsClient = new SQSClient({ region: REGION });

const chance = new Chance();

module.exports = { sqsClient, chance };
