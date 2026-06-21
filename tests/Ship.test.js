import Ship from "../src/game/Ship";

test("ship starts with 0 hits", () => {
  const ship = Ship("Destroyer", 2);

  expect(ship.hitNo).toBe(0);
});

test("hit increases hit count", () => {
  const ship = Ship("Destroyer", 2);

  ship.hit();

  expect(ship.hitNo).toBe(1);
});

test("ship sinks when hit enough times", () => {
  const ship = Ship("Destroyer", 2);

  ship.hit();
  ship.hit();

  expect(ship.isSunk()).toBe(true);
});

test("ship cannot be hit after sinking", () => {
  const ship = Ship("Destroyer", 2);

  ship.hit();
  ship.hit();
  ship.hit();

  expect(ship.hitNo).toBe(2);
});

test("creates ship with correct name and length", () => {
  const ship = Ship("Destroyer", 2);

  expect(ship.name).toBe("Destroyer");
  expect(ship.length).toBe(2);
});

test("is not sunk before enough hits", () => {
  const ship = Ship("Destroyer", 2);

  ship.hit();

  expect(ship.isSunk()).toBe(false);
});
