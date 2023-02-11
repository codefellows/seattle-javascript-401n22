const { SendMessageCommand } = require("@aws-sdk/client-sqs");

const { sqsClient, chance } = require("../util");

function sendPickup(vendorId) {
  const event = {
    vendor: vendorId,
    store: chance.city(),
    orderId: chance.guid().substring(0, 8),
    customer: chance.name(),
    address: chance.address(),
  };
  console.log("Vendor asking for pickup!", event.vendor, event);
  // ioClient.emit(EVENT_NAMES.pickup, event);
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
