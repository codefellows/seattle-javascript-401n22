const { chance, EVENT_NAMES } = require("../utils");

function sendPickup(ioClient) {
  const event = {
    vendor: ioClient.id,
    store: chance.city(),
    orderId: chance.guid().substring(0, 8),
    customer: chance.name(),
    address: chance.address(),
  };
  console.log("Vendor asking for pickup!", ioClient.id, event);
  ioClient.emit(EVENT_NAMES.pickup, event);
}

function acknowledgeDelivery(orderId, ioClient) {
  console.log("Vendor thank you for the delivery!", ioClient.id, orderId);
}

function startvendor(ioclient) {
  ioclient.on(event_names.delivered, (orderid) =>
    acknowledgedelivery(orderid, ioclient)
  );
  console.log("vendor ready!");

  // copy this pattern
  function ready() {
    sendpickup(ioclient);

    settimeout(ready, chance.integer({ min: 3000, max: 4000 }));
  }
  ready();
  // the pattern
}

module.exports = {
  startvendor,
};
