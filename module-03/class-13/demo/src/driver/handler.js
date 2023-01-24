const { EVENT_NAMES, chance } = require("../utils");

function deliver(orderId, ioClient) {
  console.log(`Driver finished delivery`, ioClient.id, orderId);
  ioClient.emit(EVENT_NAMES.delivered, orderId);
}

function handlePickup(payload, ioClient) {
  console.log("Driver received a pickup event!", ioClient.id, payload.orderId);
  setTimeout(
    () => deliver(payload.orderId, ioClient),
    chance.integer({ min: 500, max: 1000 })
  );
}

function startDriver(ioClient) {
  console.log("Driver ready!", ioClient.id);

  ioClient.on(EVENT_NAMES.pickup, (event) => handlePickup(event, ioClient));
}

module.exports = {
  startDriver,
  toTest: {
    deliver,
    handlePickup,
  },
};
