import React, { createContext, useEffect, useState } from "react";
import EffectDemo from "./EffectDemo";
import { socket } from "./socket";
import FormComponent from "./FormComponent";

export const UserContext = createContext("");

const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [userName, setUserName] = useState("Sara");
  // can become more advanced:
  // const [userName, setUserName] = useState({
  //   name: "sara",
  //   height: "4-11",
  //   age: 41,
  // });

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
    <UserContext.Provider value={{ userName, setUserName }}>
      <div>
        <p>Is connected? {isConnected ? "true" : "false"}</p>
        <button onClick={handleHello}>Say hello</button>
        <EffectDemo />
        <FormComponent />
      </div>
    </UserContext.Provider>
  );
};

export default App;
