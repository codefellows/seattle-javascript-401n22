import React, { useEffect, useState } from "react";
import EffectDemo from "./EffectDemo";
import { socket } from "./socket";

const App = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    function handleConnect() {
      setIsConnected(true);
      console.log("handleConnect has been triggered");
    }

    function handleDisconnect() {
      setIsConnected(false);
      console.log("handleDisconnect has been triggered");
    }

    // these are our listeners
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("response", (payload) => console.log(payload));

    // clean up the socket listeners
    return () => {
      // turns off socket listeners
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("response", () => console.log("response listener is off"));
    };
  }, []);

  const handleHello = () => {
    socket.emit("hello");
  };

  return (
    <div>
      <p>Is connected? {isConnected ? "true" : "false"}</p>
      <button onClick={handleHello}>Say hello</button>
      <EffectDemo />
    </div>
  );
};

export default App;
