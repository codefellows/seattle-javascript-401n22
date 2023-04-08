import gameSlice, { TIE, rps } from "./game";

describe("Game Reducers", () => {
  test("handles Ties correctly", () => {
    // Arrange
    // define an initial state
    const initialState = {
      playerThrow: undefined,
      computerThrow: undefined,
      shots: 0,
      playerWin: 0,
      computerWin: 0,
      done: false,
    };

    // Act
    const state = gameSlice.reducer(
      initialState,
      gameSlice.actions.shoot({ shot: "paper", computer: () => "paper" })
    );

    // Assert
    // check that the state changed as expected
    expect(state.shots).toBe(1);
    expect(state.playerThrow).toBe("paper");
    expect(state.playerWin).toBe(0);
    expect(state.computerWin).toBe(0);
  });
});

describe("rps", () => {
  it("detects ties", () => {
    // Arrange
    const computerThow = "paper";
    const playerThow = "paper";

    // Act
    const result = rps(computerThow, playerThow);

    // Assert
    expect(result).toBe(TIE);
  });
});
