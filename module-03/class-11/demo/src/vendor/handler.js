const { events, chance } = require("../events");

// 1. Vendor sends pickup event for a store

function sendPickup() {
  const event = {
    store: chance.city(),
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  };
  console.log("Vendor asking for pickup!", event);
  events.emit("pickup", event);
}

function acknowledgeDelivery(orderId) {
  console.log("Vendor thank you for the delivery!", orderId);
}

function startVendor() {
  events.on("delivered", acknowledgeDelivery);
  console.log("Vendor ready!");

  // Copy this pattern
  function ready() {
    sendPickup();

    setTimeout(ready, chance.integer({ min: 750, max: 2000 }));
  }
  ready();
  // The pattern
}

module.exports = { startVendor };
