import { state } from "../data/state.js";
import GameBoard from "../game/GameBoard.js";
import Player from "../game/Player.js";
import { gameScreen } from "../ui/game-screen.js";
import { initStartScreen } from "../ui/start-screen.js";

export function initHandlers() {
  document.body.addEventListener("click", (e) => {
    if (
      e.target.matches(".start-screen__reload-btn") ||
      e.target.matches(".start-screen__reload-img")
    ) {
      state.player = Player(GameBoard());
      document
        .querySelector(".start-screen__board-container")
        .replaceChildren(initStartScreen().createSelectionBoard());
    }
    if (e.target.matches(".start-screen__start-btn")) {
      document
        .querySelector(".container")
        .replaceChildren(gameScreen().createGameScreen());
    }
    if (
      e.target.matches(".game-screen__computer-grid-elem") ||
      e.target.matches(".game-screen__computer-ship-elem")
    ) {
      const [level, _, coords] = e.target.dataset.id.split("");
      state.computer.gameboard.receiveAttack([Number(level), Number(coords)]);
      document
        .querySelector(".game-screen__computer-board-container")
        .replaceChildren(gameScreen().createComputerBoard(state.computer));
      state.turn = state.computer;
    }
    if (state.player.gameboard.reportSunkStatus()) {
      document
        .querySelectorAll(
          ".game-screen__computer-board-container, .game-screen__player-board-container",
        )
        .forEach((board) => {
          board.classList.add("disabled-board");
        });
      document
        .querySelector(".game-screen__winner-modal-container")
        .classList.remove("hidden");
      gameScreen().changeWinner("Computer");
      console.log("All player ships are sunk");
    } else if (state.computer.gameboard.reportSunkStatus()) {
      document
        .querySelectorAll(
          ".game-screen__computer-board-container,  .game-screen__player-board-container",
        )
        .forEach((board) => {
          board.classList.add("disabled-board");
        });
      document
        .querySelector(".game-screen__winner-modal-container")
        .classList.remove("hidden");
      gameScreen().changeWinner("You");
      console.log("All computer ships are sunk");
    } else {
      while (state.turn === state.computer) {
        state.player.gameboard.receiveAttack([
          Math.floor(Math.random() * 7),
          Math.floor(Math.random() * 7),
        ]);
        document
          .querySelector(".game-screen__player-board-container")
          .replaceChildren(gameScreen().createPlayerBoard(state.player));
        state.turn = state.player;
      }
    }
    if (e.target.matches(".winner-modal__retry-btn")) {
      state.player = Player(GameBoard());
      state.computer = Player(GameBoard());
      document.querySelector(".game-screen__winner-modal-container").remove();
      document
        .querySelector(".container")
        .replaceChildren(initStartScreen().createStartScreen());
    }
  });
}
