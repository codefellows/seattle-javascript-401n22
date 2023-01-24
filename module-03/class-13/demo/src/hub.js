const { EVENT_NAMES } = require("./utils");

function onDelivered(delivered, socket, io) {
  console.log("HUB delivered by driver", socket.id, delivered);
  io.emit(EVENT_NAMES.delivered, delivered);
}

function onPickup(pickup, socket, io) {
  console.log("HUB pickup from client", socket.id, pickup.orderId);
  io.emit(EVENT_NAMES.pickup, pickup);
}

function onConnection(socket, io) {
  console.log("have new connection", socket.id);

  socket.on(EVENT_NAMES.delivered, (payload) =>
    onDelivered(payload, socket, io)
  );
  socket.on(EVENT_NAMES.pickup, (payload) => onPickup(payload, socket, io));
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
