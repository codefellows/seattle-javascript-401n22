const { Server } = require("socket.io");
const { EVENT_NAMES } = require("./utils");

const io = new Server(3333);

function onDelivered(delivered) {
  console.log("HUB delivered by driver", socket.id, delivered);
  io.emit(EVENT_NAMES.delivered, delivered);
}

function onPickup(pickup) {
  console.log("HUB pickup from client", socket.id, pickup.orderId);
  io.emit(EVENT_NAMES.pickup, pickup);
}

function onConnection(socket) {
  console.log("have new connection", socket.id);

  socket.on(EVENT_NAMES.delivered, onDelivered);
  socket.on(EVENT_NAMES.pickup, onPickup);
}

function startEventServer() {
  io.on("connection", onConnection);
  console.log("Everything is started!");
}

module.exports = {
  startEventServer,
  onConnection,
  onDelivered,
  onPickup,
};
