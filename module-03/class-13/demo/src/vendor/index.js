const { io } = require("socket.io-client");
const { startVendor } = require("./handler");

const events = io("ws://localhost:3333");

startVendor(events);
