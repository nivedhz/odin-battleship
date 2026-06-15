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
  function placeShips() {
    let randomCoordinateLevel = Math.floor(Math.random() * coordinates.length);
    let randomCoordinate = Math.floor(Math.random() * 7);
    let ship = "Battleship";
    let shipLength = 5;
    while (shipLength !== 0) {
      if (randomCoordinate + shipLength <= 7) {
        coordinates[randomCoordinateLevel][randomCoordinate] = ship;
        randomCoordinate++;
        shipLength--;
      } else {
        throw new Error("Out of bounds");
      }
    }
  }
  initCoordinates();
  placeShips();
  return {
    coordinates,
    missedAttacks: 0,
    receiveAttack(coordinates) {},
    reportSunkStatus() {},
  };
};

const game = Gameboard();
console.log(game.coordinates);
