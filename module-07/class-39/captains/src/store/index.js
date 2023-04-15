import { configureStore, createSlice } from "@reduxjs/toolkit";
import captains from "./database";

const captainsSlice = createSlice({
  name: "captains",
  initialState: {
    captains,
  },
  reducers: {},
});

export const listCaptainsSelector = (state) =>
  Object.keys(state.captains.captains);
export const captainSelector = (name) => (state) =>
  state.captains.captains[name];

export const store = configureStore({
  reducer: {
    captains: captainsSlice.reducer,
  },
});
