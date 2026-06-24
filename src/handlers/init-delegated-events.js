import { state } from "../data/state.js";
import GameBoard from "../game/GameBoard.js";
import Player from "../game/Player.js";
import { gameScreen } from "../ui/game-screen.js";
import { initStartScreen } from "../ui/start-screen.js";

export function initHandlers(container) {
  container.addEventListener("click", (e) => {
    if (
      e.target.matches(".start-screen__reload-btn") ||
      e.target.matches(".start-screen__reload-img")
    ) {
      state.player = Player(GameBoard());
      document
        .querySelector(".start-screen__board-container")
        .replaceChildren(initStartScreen(container).createSelectionBoard());
    }
    if (e.target.matches(".start-screen__start-btn")) {
      container.replaceChildren(gameScreen().createGameScreen());
    }
  });
}
