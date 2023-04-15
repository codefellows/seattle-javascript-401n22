import { configureStore, createSlice } from "@reduxjs/toolkit";
import captains from "./database";

const captainsSlice = createSlice({
  name: "products",
  initialState: {
    captains,
  },
  reducers: {},
});

export const listCaptainsSelector = (state) => Object.keys(state.captains);
export const captainSelector = (id) => (state) => state.captains[id];

export const store = configureStore({
  reducer: {
    captains: captainsSlice.reducer,
  },
});
