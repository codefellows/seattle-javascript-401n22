const { EVENT_NAMES, chance } = require("../utils");

const { io } = require("socket.io-client");
const events = io("ws://localhost:3333");

function deliver(orderId) {
  console.log(`Driver finished delivery`, events.id, orderId);
  events.emit(EVENT_NAMES.delivered, orderId);
}

function handlePickup(event) {
  console.log("Driver received a pickup event!", events.id, event.orderId);
  setTimeout(
    () => deliver(event.orderId),
    chance.integer({ min: 500, max: 1000 })
  );
}

function startDriver() {
  console.log("Driver ready!", events.id);

  events.on(EVENT_NAMES.pickup, handlePickup);
}

module.exports = {
  startDriver,
  toTest: {
    deliver,
    handlePickup,
  },
};
