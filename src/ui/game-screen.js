import { state } from "../data/state.js";
import "../styles/game-screen.css";
import bombImg from "../assets/bomb.svg";

export const gameScreen = () => {
  function createPlayerBoard(player) {
    const boardContainer = document.createElement("div");
    boardContainer.classList.add("game-screen__player-board-container");
    const heading = document.createElement("h1");
    heading.classList.add("game-screen__player-heading");
    heading.textContent = "Player";
    const board = document.createElement("div");
    board.classList.add("game-screen__player-board");
    let levelCoord = 0;
    let gridCoord = 0;
    player.gameboard.coordinates.forEach((level) => {
      level.forEach((coordinate) => {
        const gridElem = document.createElement("div");
        if (typeof coordinate === "number") {
          if (coordinate === 0) {
            gridElem.classList.add("game-screen__player-grid-elem");
          } else {
            gridElem.classList.add("game-screen__player-water-elem");
            gridElem.textContent = "\u2022";
          }
        } else {
          if (
            player.gameboard.attackedSpot.has(
              JSON.stringify([levelCoord, gridCoord]),
            )
          ) {
            gridElem.classList.add("game-screen__player-sunk-ship-elem");
            const bombImgContainer = document.createElement("img");
            bombImgContainer.classList.add("sunk-ship-elem__bomb-img");
            bombImgContainer.src = bombImg;
            gridElem.append(bombImgContainer);
          } else gridElem.classList.add("game-screen__player-ship-elem");
        }
        board.append(gridElem);
        gridCoord++;
      });
      levelCoord++;
      gridCoord = 0;
    });

    boardContainer.append(heading, board);
    return boardContainer;
  }
  function createComputerBoard(player) {
    const boardContainer = document.createElement("div");
    boardContainer.classList.add("game-screen__computer-board-container");
    const heading = document.createElement("h1");
    heading.classList.add("game-screen__computer-heading");
    heading.textContent = "Computer";
    const board = document.createElement("div");
    board.classList.add("game-screen__computer-board");
    let levelCoord = 0;
    let gridCoord = 0;
    player.gameboard.coordinates.forEach((level) => {
      level.forEach((coordinate) => {
        const gridElem = document.createElement("div");
        gridElem.dataset.id = `${levelCoord} ${gridCoord}`;
        if (typeof coordinate === "number") {
          if (coordinate === 0) {
            gridElem.classList.add("game-screen__computer-grid-elem");
          } else {
            gridElem.classList.add("game-screen__computer-water-elem");
            gridElem.textContent = "\u2022";
          }
        } else {
          if (
            player.gameboard.attackedSpot.has(
              JSON.stringify([levelCoord, gridCoord]),
            )
          ) {
            gridElem.classList.add("game-screen__computer-sunk-ship-elem");
            const bombImgContainer = document.createElement("img");
            bombImgContainer.classList.add("sunk-ship-elem__bomb-img");
            bombImgContainer.src = bombImg;
            gridElem.append(bombImgContainer);
          } else gridElem.classList.add("game-screen__computer-ship-elem");
        }
        board.append(gridElem);
        gridCoord++;
      });
      levelCoord++;
      gridCoord = 0;
    });

    boardContainer.append(heading, board);
    return boardContainer;
  }
  function createGameScreen() {
    const gameScreenContainer = document.createElement("div");
    gameScreenContainer.classList.add("game-screen__container");
    const userBoard = createPlayerBoard(state.player);
    const computerBoard = createComputerBoard(state.computer);
    gameScreenContainer.append(userBoard, computerBoard);

    return gameScreenContainer;
  }
  return {
    createGameScreen,
    createComputerBoard,
    createPlayerBoard,
  };
};
