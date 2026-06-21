import Player from "../src/game/Player";

test("player has a gameboard", () => {
  const player = Player();

  expect(player.gameboard).toBeDefined();
});

test("player gameboard exists", () => {
  const player = Player();

  expect(typeof player.gameboard.receiveAttack).toBe("function");
});
