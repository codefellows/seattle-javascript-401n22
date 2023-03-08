import "./App.css";
import { useReducer } from "react";

export const KIDS_ROOM = "Melis' Play Cloud";
export const HALLWAY = "Main Hallway";
export const BATHROOM = "Diego's Delight";
export const PARENTS_ROOM = "Parent's Chambers";
export const GARAGE = "Boxes and Barels";
export const LIVING_ROOM = "Dad's Dungeon";
export const KITCHEN = "COOKIE HEAVEN";

export const MAP = {
  [KIDS_ROOM]: [HALLWAY, BATHROOM],
  [BATHROOM]: [HALLWAY, KIDS_ROOM, PARENTS_ROOM],
  [PARENTS_ROOM]: [HALLWAY, BATHROOM],
  [HALLWAY]: [PARENTS_ROOM, BATHROOM, KIDS_ROOM, GARAGE, LIVING_ROOM, KITCHEN],
  [GARAGE]: [HALLWAY],
  [LIVING_ROOM]: [HALLWAY, KITCHEN],
  [KITCHEN]: [LIVING_ROOM, HALLWAY],
};

export const OBJECTS = {
  [KIDS_ROOM]: ["Backpack"],
  [BATHROOM]: ["Stepstool"],
  [PARENTS_ROOM]: ["Slippers"],
  [HALLWAY]: ["Umbrella"],
  [GARAGE]: ["Baseball Mit"],
  [LIVING_ROOM]: ["Remote"],
  [KITCHEN]: ["Cookie Jar"],
};

// COMMON: Object approach
// ACTION: {action: "string action", payload: {detail: "action"}}

export const MOVE = "move";
export const PICKUP = "pickup";

// SIMPLE: Tuple approach
// ACTION: ["string action", "details of the action"]
export function handleGame(state, action) {
  if (action[0] === MOVE) {
    const nextRoom = action[1];
    if (MAP[state.room].includes(nextRoom)) {
      state.room = nextRoom;
    }
  }

  if (action[0] === PICKUP) {
    const object = action[1];
    if (!state.inventory.includes(object)) {
      state.inventory = [...state.inventory, object];
    }
  }

  return { ...state };
}

export const startState = {
  room: KIDS_ROOM,
  inventory: [],
};

function App() {
  const [state, dispatch] = useReducer(handleGame, startState);

  const room = state.room;
  const inventory = state.inventory;

  return (
    <div className="App">
      <header className="App-header">
        Melis is in: {room}
        <p>
          Inventory:{" "}
          <ul>
            {inventory.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
        </p>
        <p>
          {MAP[room].map((nextRoom) => (
            <button key={nextRoom} onClick={() => dispatch([MOVE, nextRoom])}>
              {nextRoom}
            </button>
          ))}
        </p>
        <p>
          {OBJECTS[room]
            .filter((item) => !inventory.includes(item))
            .map((item) => (
              <button key={item} onClick={() => dispatch([PICKUP, item])}>
                {item}
              </button>
            ))}
        </p>
      </header>
    </div>
  );
}

export default App;
