import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const BEASTS = require("./data.json");

export const loadBeasts = createAsyncThunk("beasts/load", async () => {
  const response = await fetch("/data.json");
  const json = await response.json();
  return json;
});

const beastSlice = createSlice({
  name: "beast",
  initialState: {
    beasts: [],
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
  extraReducers: (builder) => {
    builder.addCase(loadBeasts.fulfilled, (state, { payload }) => {
      state.beasts = payload;
    });
  },
});

export const filteredBeasts = ({ beast: { numberOfHorns, beasts } }) =>
  numberOfHorns
    ? beasts.filter((beast) => beast.horns === numberOfHorns)
    : beasts;

export default beastSlice;
