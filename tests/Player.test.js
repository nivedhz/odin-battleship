import Player from "../src/game/Player";
import GameBoard from "../src/game/GameBoard";

test("player has a gameboard", () => {
  const player = Player(GameBoard());

  expect(player.gameboard).toBeDefined();
});

test("gameboard has receiveAttack method", () => {
  const player = Player(GameBoard());

  expect(typeof player.gameboard.receiveAttack).toBe("function");
});
