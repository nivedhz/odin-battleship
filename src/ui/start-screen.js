import { state } from "../data/state.js";
import "../styles/start-screen.css";
import reloadImg from "../assets/reload.svg";
export const initStartScreen = (container) => {
  function createHeading() {
    const heading = document.createElement("h1");
    heading.classList.add("start-screen__heading");
    heading.textContent = "Battleship";

    return heading;
  }
  function createSelectionBoard() {
    const board = document.createElement("div");
    board.classList.add("start-screen__board");
    let levelCoord = 0;
    let gridCoord = 0;
    state.player.gameboard.coordinates.forEach((level) => {
      level.forEach((coordinate) => {
        const gridElem = document.createElement("div");
        if (typeof coordinate === "number") {
          if (coordinate === 0) {
            gridElem.classList.add("start-screen__grid-elem");
          }
        } else {
          gridElem.classList.add("start-screen__ship-elem");
        }
        board.append(gridElem);
        gridCoord++;
      });
      levelCoord++;
      gridCoord = 0;
    });

    return board;
  }
  function createReloadButton() {
    const reloadBtn = document.createElement("button");
    reloadBtn.classList.add("start-screen__reload-btn");
    const reloadImgContainer = document.createElement("img");
    reloadImgContainer.classList.add("start-screen__reload-img");
    reloadImgContainer.src = reloadImg;
    reloadBtn.append(reloadImgContainer);

    return reloadBtn;
  }
  function createStartBtn() {
    const startBtn = document.createElement("button");
    startBtn.classList.add("start-screen__start-btn");
    startBtn.textContent = "Start Game";

    return startBtn;
  }
  function createStartScreen() {
    const startScreen = document.createElement("div");
    startScreen.classList.add("start-screen__container");
    const btnContainer = document.createElement("div");
    btnContainer.classList.add("start-screen__btn-container");
    const boardContainer = document.createElement("div");
    boardContainer.classList.add("start-screen__board-container");
    const heading = createHeading();
    const selectionBoard = createSelectionBoard();
    const reloadBtn = createReloadButton();
    const startBtn = createStartBtn();
    boardContainer.append(selectionBoard);
    btnContainer.append(reloadBtn, startBtn);
    startScreen.append(heading, boardContainer, btnContainer);
    container.append(startScreen);
  }
  return {
    createStartScreen,
    createSelectionBoard,
  };
};
