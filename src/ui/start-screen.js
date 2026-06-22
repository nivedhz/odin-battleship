import { state } from "../data/state.js";
import "../styles/start-screen.css";
import bombImg from "../assets/bomb.svg";
function createSelectionBoard() {
  const boardContainer = document.createElement("div");
  boardContainer.classList.add("start-screen__board-container");
  let levelCoord = 0;
  let gridCoord = 0;
  state.player.gameboard.coordinates.forEach((level) => {
    level.forEach((coordinate) => {
      const gridElem = document.createElement("div");
      if (typeof coordinate === "number") {
        state.player.gameboard.receiveAttack([5, 2]);
        state.player.gameboard.receiveAttack([4, 2]);
        state.player.gameboard.receiveAttack([3, 2]);
        if (coordinate === 0) {
          gridElem.classList.add("start-screen__grid-elem");
        } else {
          gridElem.classList.add("start-screen__water-elem");
          gridElem.textContent = "\u2022";
        }
      } else {
        if (
          state.player.gameboard.attackedSpot.has(
            JSON.stringify([levelCoord, gridCoord]),
          )
        ) {
          gridElem.classList.add("start-screen__sunk-ship-elem");
          const bombImgContainer = document.createElement("img");
          bombImgContainer.classList.add("sunk-ship-elem__bomb-img");
          bombImgContainer.src = bombImg;
          gridElem.append(bombImgContainer);
        } else gridElem.classList.add("start-screen__ship-elem");
      }
      boardContainer.append(gridElem);
      gridCoord++;
    });
    levelCoord++;
    gridCoord = 0;
  });

  return boardContainer;
}
export function createStartScreen(container) {
  const selectionBoard = createSelectionBoard();
  container.append(selectionBoard);
}
