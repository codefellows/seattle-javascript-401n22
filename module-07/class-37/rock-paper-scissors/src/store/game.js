import { createSlice } from "@reduxjs/toolkit";

export const PLAYER_WIN = 1;
export const COMPUTER_WIN = -1;
export const TIE = 0;
export const BEST_OF = 3;

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
      state.computerThrow = (action.payload.computer ?? DEFAULT_COMPUTER)();

      switch (rps(state.playerThrow, state.computerThrow)) {
        case PLAYER_WIN: // player wins
          state.playerWin += 1;
          break;
        case COMPUTER_WIN: //computer wins
          state.computerWin += 1;
          break;
        case TIE: // tie
        default:
        // Nothing happens!
      }
      state.shots += 1;
      state.done = state.computerWin + state.playerWin >= BEST_OF;
    },
    resetGame: (state) => {
      state.playerThrow = undefined;
      state.computerThrow = undefined;
      state.shots = 0;
      state.playerWin = 0;
      state.computerWin = 0;
      state.done = false;
    },
  },
});

function DEFAULT_COMPUTER() {
  return ["rock", "paper", "scissors"][(Math.random() * 3) | 0];
}

/** Returns -1 for computer wins, 0 for tie, and 1 for player wins */
export function rps(player, computer) {
  switch (player) {
    case "rock":
      switch (computer) {
        case "rock":
          return TIE;
        case "paper":
          return COMPUTER_WIN;
        case "scissors":
          return PLAYER_WIN;
        default:
          throw new Error(
            `Invalid shots: Player ${player}, Computer ${computer}`
          );
      }
    case "paper":
      switch (computer) {
        case "rock":
          return COMPUTER_WIN;
        case "paper":
          return TIE;
        case "scissors":
          return PLAYER_WIN;
        default:
          throw new Error(
            `Invalid shots: Player ${player}, Computer ${computer}`
          );
      }
    case "scissors":
      switch (computer) {
        case "rock":
          return COMPUTER_WIN;
        case "paper":
          return PLAYER_WIN;
        case "scissors":
          return TIE;
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
