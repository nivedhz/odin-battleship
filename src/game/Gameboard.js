export const Gameboard = () => {
  const coordinates = [];
  function initCoordinates() {
    for (let i = 1; i <= 7; i++) {
      for (let j = 1; j <= 7; j++) {
        coordinates.push([i, j]);
      }
    }
  }
  function placeShips() {}
  initCoordinates();
  return {
    coordinates,
    missedAttacks: 0,
    receiveAttack(coordinates) {},
    reportSunkStatus() {},
  };
};
