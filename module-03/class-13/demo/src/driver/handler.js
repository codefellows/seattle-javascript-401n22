const { EVENT_NAMES, chance } = require("../utils");

function deliver(orderId, ioClient) {
  console.log(`Driver finished delivery`, ioClient.id, orderId);
  ioClient.emit(EVENT_NAMES.delivered, orderId);
  ioClient.emit(EVENT_NAMES.driverReady);
}

function handlePickup(payload, ioClient) {
  console.log("Driver received a pickup event!", ioClient.id, payload.orderId);
  setTimeout(
    () => deliver(payload.orderId, ioClient),
    chance.integer({ min: 500, max: 1000 })
  );
}

function startDriver(ioClient) {
  ioClient.on(EVENT_NAMES.pickup, (event) => handlePickup(event, ioClient));
  ioClient.emit(EVENT_NAMES.driverReady);
  console.log("Driver ready!", ioClient.id);
}

module.exports = {
  startDriver,
  toTest: {
    deliver,
    handlePickup,
  },
};
