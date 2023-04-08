import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./game";
import campaignSlice from "./campaign";

export const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
    campaign: campaignSlice.reducer,
  },
});
