import { createSlice } from "@reduxjs/toolkit";

const BEASTS = require("./data.json");

const beastSlice = createSlice({
  name: "beast",
  initialState: {
    beasts: BEASTS,
    numberOfHorns: undefined,
    selectedBeast: undefined,
  },
  reducers: {
    setHornCount: (state, action) => {
      state.numberOfHorns = action.payload;
    },
    showBeast: (state, action) => {
      state.selectedBeast = action.payload;
    },
  },
});

export const filteredBeasts = ({ beast: { numberOfHorns, beasts } }) =>
  numberOfHorns
    ? beasts.filter((beast) => beast.horns === numberOfHorns)
    : beasts;

export default beastSlice;
