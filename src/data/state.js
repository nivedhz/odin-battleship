import Player from "../game/Player.js";
import GameBoard from "../game/GameBoard.js";

const state = {
  turn: null,
  player: Player(GameBoard()),
  computer: Player(GameBoard()),
};

state.turn = state.player;
export { state };
