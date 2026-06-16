import { Ship } from "./Ship.js";

export const Gameboard = () => {
  const coordinates = [];
  function initCoordinates() {
    for (let i = 1; i <= 7; i++) {
      const coordinateLevels = [];
      for (let j = 1; j <= 7; j++) {
        coordinateLevels.push([i, j]);
      }
      coordinates.push(coordinateLevels);
    }
  }
  function initShips() {
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
    return shipTypes;
  }
  function placeShips(ships) {
    ships.forEach((ship) => {
      let randomCoordinateLevel = Math.floor(
        Math.random() * coordinates.length,
      );
      let randomCoordinate = Math.floor(Math.random() * ship.ship.length);
      let shipLength = ship.ship.length;
      while (shipLength !== 0) {
        coordinates[randomCoordinateLevel][randomCoordinate] = ship.ship;
        randomCoordinate++;
        shipLength--;
      }
    });
  }
  initCoordinates();
  placeShips(initShips());
  return {
    coordinates,
    missedAttacks: 0,
    receiveAttack(coordinates) {},
    reportSunkStatus() {},
  };
};

const game = Gameboard();
console.log(game.coordinates);
