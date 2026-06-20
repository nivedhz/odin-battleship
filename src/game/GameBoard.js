import Ship from "./Ship.js";

const GameBoard = () => {
  const coordinates = [];
  let missedAttacks = 0;
  let attackedSpot = new Set();
  function initCoordinates() {
    for (let i = 1; i <= 7; i++) {
      const coordinateLevels = [];
      for (let j = 1; j <= 7; j++) {
        coordinateLevels.push([i, j]);
      }
      coordinates.push(coordinateLevels);
    }
  }
  function placeShips() {
    const shipTypes = [
      { ship: Ship(), name: "Aircraft Carrier", length: 5 },
      { ship: Ship(), name: "Battleship", length: 4 },
      { ship: Ship(), name: "Cruiser", length: 3 },
      { ship: Ship(), name: "Destroyer", length: 3 },
      { ship: Ship(), name: "Submarine", length: 2 },
    ];
    shipTypes.forEach((ship) => {
      ship.ship.name = ship.name;
      ship.ship.length = ship.length;
    });
    shipTypes.forEach((ship) => {
      let randomCoordinateLevel = Math.floor(
        Math.random() * coordinates.length,
      );
      let randomCoordinate = Math.floor(Math.random() * ship.ship.length);
      let shipLength = ship.ship.length;
      while (shipLength !== 0) {
        if (
          typeof coordinates[randomCoordinateLevel][randomCoordinate] ===
            "object" &&
          coordinates[randomCoordinateLevel][randomCoordinate] !== null &&
          Array.isArray(coordinates[randomCoordinateLevel][randomCoordinate])
        ) {
          coordinates[randomCoordinateLevel][randomCoordinate] = ship.ship;
          randomCoordinate++;
          shipLength--;
        } else return new Error("Invalid Ship Placement");
      }
    });
  }
  async function retryTillSuccess(fn, ...args) {
    let success = false;

    while (!success) {
      try {
        await fn(...args);
        success = true;
      } catch (error) {
        return new Error(error.message);
      }
    }
  }
  initCoordinates();
  retryTillSuccess(placeShips);
  return {
    logCoordinates() {
      console.log(coordinates);
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
