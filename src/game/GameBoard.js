import Ship from "./Ship.js";

const GameBoard = () => {
  const BOARD_SIZE = 7;
  const coordinates = Array(BOARD_SIZE)
    .fill(null)
    .map(() => Array(BOARD_SIZE).fill(0));
  const shipTypes = [
    Ship("Carrier", 5),
    Ship("Battleship", 4),
    Ship("Cruiser", 3),
    Ship("Submarine", 3),
    Ship("Destroyer", 2),
  ];
  let missedAttacks = 0;
  let attackedSpot = new Set();
  function canPlaceShip(row, col, size, isHorizontal) {
    for (let i = 0; i < size; i++) {
      let r = row + (isHorizontal ? 0 : i);
      let c = col + (isHorizontal ? i : 0);
      if (r >= BOARD_SIZE || c >= BOARD_SIZE) return false;
      if (coordinates[r][c]) return false;
    }
    return true;
  }
  function placeShipRandomly(ship) {
    let placed = false;

    while (!placed) {
      const isHorizontal = Math.random() < 0.5;

      const row = Math.floor(Math.random() * BOARD_SIZE);
      const col = Math.floor(Math.random() * BOARD_SIZE);

      if (canPlaceShip(row, col, ship.length, isHorizontal)) {
        for (let i = 0; i < ship.length; i++) {
          let r = row + (isHorizontal ? 0 : i);
          let c = col + (isHorizontal ? i : 0);
          coordinates[r][c] = ship.name;
        }
        placed = true;
      }
    }
  }

  function generateRandomLayout() {
    shipTypes.sort((a, b) => b.length - a.length);

    shipTypes.forEach((ship) => placeShipRandomly(ship));
  }
  generateRandomLayout();
  return {
    logCoordinates() {
      console.table(coordinates);
    },
    receiveAttack(coordinates) {
      let [x, y] = coordinates;
      x -= 1;
      y -= 1;
      if (x > 7 || y > 7) return;
      if (!attackedSpot.has(JSON.stringify([x, y]))) {
        if (
          typeof coordinates[x][y] === "object" &&
          coordinates[x][y] !== null &&
          !Array.isArray(coordinates[x][y])
        ) {
          coordinates[x][y].hit();
        } else {
          console.log("Missed Target");
          missedAttacks++;
        }
        attackedSpot.add(JSON.stringify([x, y]));
      } else return;
    },
    reportSunkStatus() {},
  };
};
const game = GameBoard();
game.logCoordinates();

export default GameBoard;
