import { Ship } from "../src/game/Ship";

describe("Hit", () => {
  test("Hit", () => {
    const ship = Ship();
    expect(ship.hitNo).toBe(0);
    ship.hit();
    expect(ship.hitNo).toBe(1);
  });
});
describe("Sink", () => {
  test("Sink", () => {
    const ship = Ship();
    ship.length = 5;
    expect(ship.sunkStatus).toBe(false);
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
    expect(ship.sunkStatus).toBe(true);
  });
});
