const { SendMessageCommand } = require("@aws-sdk/client-sqs");

const { sqsClient, chance, QUEUES } = require("../util");

async function sendPickup(vendorId) {
  const event = {
    vendor: vendorId,
    store: chance.city(),
    orderId: chance.guid().substring(0, 8),
    customer: chance.name(),
    address: chance.address(),
  };
  console.log("Vendor asking for pickup!", event.vendor, event);
  // ioClient.emit(EVENT_NAMES.pickup, event);
  try {
    const message = await sqsClient.send(
      new SendMessageCommand({
        MessageBody: JSON.stringify(event),
        MessageGroupId: vendorId,
        QueueUrl: QUEUES.Pickup,
      })
    );
    console.log("Vendor send pickup request!", message.MessageId);
    return message;
  } catch (e) {
    console.error("Failed to send Pickup message", e);
  }
}

function startVendor(name) {
  // ioclient.on(event_names.delivered, (orderid) =>
  //   acknowledgedelivery(orderid, ioclient)
  // );
  console.log("vendor ready!");

  // copy this pattern
  function ready() {
    sendPickup(name);

    setTimeout(ready, chance.integer({ min: 3000, max: 4000 }));
  }
  ready();
  // the pattern
}

module.exports = {
  startVendor,
};
