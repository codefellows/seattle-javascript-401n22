const {
  ReceiveMessageCommand,
  DeleteMessageCommand,
} = require("@aws-sdk/client-sqs");
const { sqsClient, QUEUES, chance } = require("../util");

function deliver(orderId) {
  console.log(`Driver finished delivery`, orderId);
  //   ioClient.emit(EVENT_NAMES.delivered, orderId);
  //   ioClient.emit(EVENT_NAMES.driverReady);
  handlePickup();
}

async function handlePickup() {
  try {
    const received = await sqsClient.send(
      new ReceiveMessageCommand({
        QueueUrl: QUEUES.Pickup,
      })
    );
    if (received.Messages?.length > 0) {
      await sqsClient.send(
        new DeleteMessageCommand({
          QueueUrl: QUEUES.Pickup,
          ReceiptHandle: received.Messages[0].ReceiptHandle,
        })
      );
      const payload = JSON.parse(received.Messages[0].Body);
      console.log("Driver received a pickup event!", payload);
      setTimeout(
        () => deliver(payload.orderId),
        chance.integer({ min: 500, max: 1000 })
      );
    } else {
      console.log("No pickup ready");
      setTimeout(handlePickup, 1000);
    }
  } catch (e) {
    console.error("Failed to handlePickup", e);
  }
}

function startDriver() {
  console.log("Driver ready!");
  handlePickup();
}

module.exports = {
  startDriver,
  // toTest: {
  //   deliver,
  //   handlePickup,
  // },
};
