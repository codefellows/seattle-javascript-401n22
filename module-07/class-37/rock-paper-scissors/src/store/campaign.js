import { createSlice } from "@reduxjs/toolkit";

const campaignSlice = createSlice({
  name: "rock-paper-scissors",
  initialState: {
    playerGamesWon: 0,
    totalGamesPlayed: 0,
  },
  reducers: {
    recordGame: (state, action) => {
      state.totalGamesPlayed += 1;
      const { game } = action.payload;
      if (game.playerWin > game.computerWin) {
        state.playerGamesWon += 1;
      }
    },
  },
});

export default campaignSlice;
