const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

io.listen(4000);

function handleHello() {
  console.log("client says hello");
  io.emit("response", "Hi from Server!");
}

function handleConnection(socket) {
  console.log("have new connection", socket.id);
  socket.on("hello", handleHello);
}

function startEventServer() {
  io.on("connection", handleConnection);
  console.log("Everything is started!");
}

startEventServer();
