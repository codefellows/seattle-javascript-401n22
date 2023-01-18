const chance = require("chance")();

const EVENT_NAMES = {
  pickup: "pickup",
  delivered: "delivered",
};

module.exports = { chance, EVENT_NAMES };
