import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "rock-paper-scissors",
  initialState: {
    playerThrow: undefined,
    computerThrow: undefined,
    shots: 0,
    playerWin: 0,
    computerWin: 0,
    done: false,
  },
  reducers: {
    shoot: (state, action) => {
      if (state.done) {
        return;
      }
      state.playerThrow = action.payload.shot;
      state.computerThrow = ai();

      switch (rps(state.playerThrow, state.computerThrow)) {
        case 1: // player wins
          state.playerWin += 1;
          break;
        case -1: //computer wins
          state.computerWin += 1;
          break;
        case 0: // tie
        default:
        // Nothing happens!
      }
      state.shots += 1;
      state.done = state.computerWin + state.playerWin >= 3;
    },
  },
});

function ai() {
  return ["rock", "paper", "scissors"][(Math.random() * 3) | 0];
}

/** Returns -1 for computer wins, 0 for tie, and 1 for player wins */
function rps(player, computer) {
  switch (player) {
    case "rock":
      switch (computer) {
        case "rock":
          return 0;
        case "paper":
          return -1;
        case "scissors":
          return 1;
        default:
          throw new Error(
            `Invalid shots: Player ${player}, Computer ${computer}`
          );
      }
    case "paper":
      switch (computer) {
        case "rock":
          return 1;
        case "paper":
          return 0;
        case "scissors":
          return -1;
        default:
          throw new Error(
            `Invalid shots: Player ${player}, Computer ${computer}`
          );
      }
    case "scissors":
      switch (computer) {
        case "rock":
          return -1;
        case "paper":
          return 1;
        case "scissors":
          return 0;
        default:
          throw new Error(
            `Invalid shots: Player ${player}, Computer ${computer}`
          );
      }
    default:
      throw new Error(`Invalid shots: Player ${player}, Computer ${computer}`);
  }
}

export default gameSlice;
