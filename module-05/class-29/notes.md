### useEffect

- takes the place of componentDidMount and componentWillUnmount for functional components
- is not without pitfalls
  - rerender hell (how do we avoid this?)
- how do we use it with sockets
- how do we use it for external requests, api?
- how we use it to update state when a value changes

- Use an effect hook to manage state at various (tactical) times during the life of a component
- The "Effect" hook runs a callback with every component render
  - default behavior

```js
import React, { useEffect } from "react";
useEffect(() => {
  // Run your code here
  // this useEffect will run with every re-render
});
```

- In addition to the callback, the effect hook can accept a second parameter (an array of watchers/dependencies), indicating your preference as to when it might run or not run. The effect hook will only run when variables in that array change from the previous render.

```js
import React, { useEffect } from "react";
useEffect(() => {
  // Run your code here
  // runs only on componentDidMounts
}, []);
```

```js
import React, { useEffect, useState } from "react";

const [counter, setCounter] = useState(0);
useEffect(() => {
  // Run your code here
  // runs on component did mount, and runs when counter is updated
  console.log(counter);
}, [counter]);
```

Way to do "clean-up on Un-Mount"

- in the callback function return a function with whatever necessary stuff has to happen... aka turn off socket connection?
