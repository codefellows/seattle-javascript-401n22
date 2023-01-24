const { EVENT_NAMES, Queue } = require("./utils");

const driverQueue = new Queue();
const packageQueue = new Queue();

function queueDetails() {
  console.log("Package count", packageQueue.queue.length);
  console.log("Driver count", driverQueue.queue.length);
}

function onPickup(package, socket) {
  console.log("HUB pickup from client", socket.id, package.orderId);
  queueDetails();

  // When a package comes in with no driver, enqueue the package.
  if (driverQueue.isEmpty()) {
    // enqueue package
    packageQueue.enqueue(package);
  } else {
    // When a package comes in with a queued driver, dequeue the driver and send the package.
    const driver = driverQueue.dequeue();
    driver.emit(EVENT_NAMES.pickup, package);
  }
}

function onDriverReady(driver) {
  console.log("HUB got driver ready", driver.id);
  queueDetails();

  // When a driver comes in with no package, enqueue the driver.
  if (packageQueue.isEmpty()) {
    driverQueue.enqueue(driver);
  } else {
    // When a driver comes in with a queued package, dequeue the package and send it to the driver.
    const package = packageQueue.dequeue();
    driver.emit(EVENT_NAMES.pickup, package);
  }
}

function onDelivered(delivered, socket, io) {
  console.log("HUB delivered by driver", socket.id, delivered);
  io.emit(EVENT_NAMES.delivered, delivered);
}

function onConnection(socket, io) {
  console.log("have new connection", socket.id);

  socket.on(EVENT_NAMES.delivered, (payload) =>
    onDelivered(payload, socket, io)
  );
  socket.on(EVENT_NAMES.pickup, (payload) => onPickup(payload, socket, io));
  socket.on(EVENT_NAMES.driverReady, () => onDriverReady(socket));
}

function startEventServer(io) {
  io.on("connection", (socket) => onConnection(socket, io));
  console.log("Everything is started!");
}

module.exports = {
  startEventServer,
  onConnection,
  onDelivered,
  onPickup,
};
