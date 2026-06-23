import { state } from "../data/state.js";
import GameBoard from "../game/GameBoard.js";
import Player from "../game/Player.js";
import { initStartScreen } from "../ui/start-screen.js";

export function initHandlers(container) {
  document
    .querySelector(".start-screen__reload-btn")
    .addEventListener("click", () => {
      state.player = Player(GameBoard());
      document
        .querySelector(".start-screen__board-container")
        .replaceChildren(initStartScreen(container).createSelectionBoard());
    });
}
