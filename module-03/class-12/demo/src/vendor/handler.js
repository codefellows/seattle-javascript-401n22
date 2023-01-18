const { chance, EVENT_NAMES } = require("../utils");
const { io } = require("socket.io-client");

const events = io("ws://localhost:3333");

function sendPickup() {
  const event = {
    store: chance.city(),
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  };
  console.log("Vendor asking for pickup!", event);
  events.emit(EVENT_NAMES.pickup, event);
}

function acknowledgeDelivery(orderId) {
  console.log("Vendor thank you for the delivery!", orderId);
}

function startVendor() {
  events.on(EVENT_NAMES.delivered, acknowledgeDelivery);
  console.log("Vendor ready!");

  // Copy this pattern
  function ready() {
    sendPickup();

    setTimeout(ready, chance.integer({ min: 750, max: 2000 }));
  }
  ready();
  // The pattern
}

startVendor();
