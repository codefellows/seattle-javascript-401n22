import { createSlice } from "@reduxjs/toolkit";

const BEASTS = require("./data.json");

const beastSlice = createSlice({
  name: "beast",
  initialState: {
    beasts: BEASTS,
  },
});

export default beastSlice;
