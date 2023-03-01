import React from "react";
import Content from "./Content.js";

import "./App.css";

const App = () => {
  const changeTitle = (title) => {
    document.title = title;
  };

  return <Content changeTitle={changeTitle} greeting="Hello World" />;
};

export default App;
