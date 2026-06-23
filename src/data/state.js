import Player from "../game/Player.js";
import GameBoard from "../game/GameBoard.js";

export const state = {
  player: Player(GameBoard()),
  computer: Player(GameBoard()),
};
