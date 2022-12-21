const base64 = require("base-64");

let string = "hello\10\15\20";
let encoded = base64.encode(string);
let decoded = base64.decode(encoded);

console.log(encoded);
console.log(decoded);

// Authorization information:
// Basic <base64 username:password>
let username = "davidsouther";
let password = "maru5";
let authorization = `${username}:${password}`;
let encoded_authorization = base64.encode(authorization);

// Send this to the server, using the headers
console.log("Authorization: Basic", encoded_authorization);

// From the server, checking the header:
let decoded_authorization = base64.decode(encoded_authorization);
let [un, pw] = decoded_authorization.split(":");
console.log("Checking login for", un, pw);

// HOW TO MAKE AND CHECK A PASSWORD
const bcrypt = require("bcrypt");

async function makePassword(password) {
  console.time("Complexity 5");
  await bcrypt.hash(password, 5);
  console.timeEnd("Complexity 5");

  console.time("Complexity 12");
  await bcrypt.hash(password, 12);
  console.timeEnd("Complexity 12");

  console.time("Complexity 14");
  let hashed = await bcrypt.hash(password, 14);
  console.timeEnd("Complexity 14");
  return hashed;
}

makePassword("maru5").then(console.log);

const PASSWORD_DB_5 =
  "$2b$05$TtCCKJZH34obfxHFGbezruaATtvkMW92lMqM.ulpok8zGpePEErT.";
const PASSWORD_DB_12 =
  "$2b$12$eT1UKNdSRvLnVdW3ehizUe9EfWqtNqT9qkkggCsAlDF8xdZFycX4G";

async function showPasswordCheck(passwordToCheck) {
  let isCorrectPassword;
  console.time("Compare 5");
  isCorrectPassword = await bcrypt.compare(passwordToCheck, PASSWORD_DB_5);
  console.timeEnd("Compare 5");
  console.log(isCorrectPassword);

  console.time("Compare 12");
  isCorrectPassword = await bcrypt.compare(passwordToCheck, PASSWORD_DB_12);
  console.timeEnd("Compare 12");

  console.log(isCorrectPassword);
  return isCorrectPassword;
}

// showPasswordCheck("maru4").then(console.log);
// showPasswordCheck("maru5").then(console.log);
// showPasswordCheck("maru6").then(console.log);
