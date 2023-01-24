const { Server } = require("socket.io");
const { startEventServer } = require("./hub");

const io = new Server(3333);

startEventServer(io);
