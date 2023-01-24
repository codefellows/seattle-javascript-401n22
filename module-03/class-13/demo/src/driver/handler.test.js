const { EVENT_NAMES } = require("../utils");
const {
  toTest: { deliver, handlePickup },
} = require("./handler");

jest.useFakeTimers();

test("Driver deliver", () => {
  // Arrange
  const io = { emit: jest.fn() };

  // Act
  deliver("1234", io);

  // Assert
  expect(io.emit).toHaveBeenCalledWith(EVENT_NAMES.delivered, "1234");
});

test("Driver handlePickup", () => {
  // Arrange
  const io = { emit: jest.fn() };

  const payload = {
    store: "test",
    orderId: "1234",
    customer: "customer",
    address: "111 Main",
  };

  // Act
  handlePickup(payload, io);

  // Timers - skip setTimeout
  jest.runAllTimers();

  // Assert
  expect(io.emit).toHaveBeenCalledWith(EVENT_NAMES.delivered, "1234");
});
