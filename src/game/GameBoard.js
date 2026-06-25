import Ship from "./Ship.js";

const GameBoard = () => {
  const BOARD_SIZE = 10;
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
          coordinates[r][c] = ship;
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
    coordinates,
    attackedSpot,
    receiveAttack(coords) {
      let [x, y] = coords;
      if (x >= BOARD_SIZE || y >= BOARD_SIZE) return;
      const key = JSON.stringify([x, y]);
      if (!attackedSpot.has(key)) {
        attackedSpot.add(key);
        if (coordinates[x][y] !== 0 && typeof coordinates[x][y] === "object") {
          coordinates[x][y].hit();
        } else {
          coordinates[x][y] = 1;
        }
      }
    },

    reportSunkStatus() {
      return shipTypes.every((ship) => ship.sunkStatus);
    },
  };
};

export default GameBoard;
