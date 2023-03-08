import { render, screen } from "@testing-library/react";
import App, {
  MAP,
  MOVE,
  OBJECTS,
  PICKUP,
  handleGame,
  startState,
  BATHROOM,
  KITCHEN,
  GARAGE,
} from "./App";

test("Can move", () => {
  // Arrange
  const initial = startState;

  // Act
  const state = handleGame(initial, [MOVE, BATHROOM]);

  // Assert
  expect(state.room).toBe(BATHROOM);
});

test("Can pick up", () => {
  const initial = startState;

  const state = handleGame(initial, [PICKUP, "Brush"]);

  expect(state.inventory).toEqual(["Brush"]);
});

test("Cannot teleport", () => {
  const initial = startState;

  const state = handleGame(initial, [MOVE, KITCHEN]);

  expect(state.room).not.toBe(KITCHEN);
});

test("Starts in the garage", () => {
  const initial = { room: GARAGE, inventory: ["Backpack"] };
});
