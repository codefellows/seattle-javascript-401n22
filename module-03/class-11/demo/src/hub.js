const { startDriver } = require("./driver/handler");
const { startVendor } = require("./vendor/handler");

startDriver();
startVendor();

console.log("Everything is started!");
