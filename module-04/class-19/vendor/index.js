const { startVendor } = require("./handler");
const { chance } = require("../util");

const name = chance.word({ syllables: 3 });

startVendor(name);
