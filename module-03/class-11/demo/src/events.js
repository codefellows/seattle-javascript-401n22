const { EventEmitter } = require("events");
const chance = require("chance")();

const events = new EventEmitter();

module.exports = { events, chance };
