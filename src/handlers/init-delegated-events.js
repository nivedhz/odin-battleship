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
      const [level, coords] = e.target.dataset.id.split(" ");
      const hit = state.computer.gameboard.receiveAttack([
        Number(level),
        Number(coords),
      ]);
      if (hit === "water") {
        state.turn = state.computer;
      }
      document
        .querySelector(".game-screen__computer-board-container")
        .replaceChildren(gameScreen().createComputerBoard(state.computer));
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
    }
    if (state.computer.gameboard.reportSunkStatus()) {
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
    }
    while (state.turn === state.computer) {
      const randomLevel = Math.floor(Math.random() * 10);
      const randomCoords = Math.floor(Math.random() * 10);

      if (
        !state.player.gameboard.attackedSpot.has(
          JSON.stringify([randomLevel, randomCoords]),
        )
      ) {
        const hit = state.player.gameboard.receiveAttack([
          randomLevel,
          randomCoords,
        ]);
        if (hit === "water") {
          state.turn = state.player;
        }
        document
          .querySelector(".game-screen__player-board-container")
          .replaceChildren(gameScreen().createPlayerBoard(state.player));
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
