import GameBoard from "../src/game/GameBoard";

test("board is 7x7", () => {
  const board = GameBoard();

  expect(board.coordinates.length).toBe(7);

  board.coordinates.forEach((row) => {
    expect(row.length).toBe(7);
  });
});
test("all ships occupy 17 cells total", () => {
  const board = GameBoard();

  let shipCells = 0;

  board.coordinates.forEach((row) => {
    row.forEach((cell) => {
      if (typeof cell === "object") {
        shipCells++;
      }
    });
  });

  expect(shipCells).toBe(17);
});
test("all ship types are present", () => {
  const board = GameBoard();

  const names = new Set();

  board.coordinates.forEach((row) => {
    row.forEach((cell) => {
      if (typeof cell === "object") {
        names.add(cell.name);
      }
    });
  });

  expect(names.size).toBe(5);
});
test("receiveAttack hits a ship", () => {
  const board = GameBoard();

  let target;

  for (let r = 0; r < 7; r++) {
    for (let c = 0; c < 7; c++) {
      if (typeof board.coordinates[r][c] === "object") {
        target = [r + 1, c + 1];
        break;
      }
    }

    if (target) break;
  }

  const ship = board.coordinates[target[0] - 1][target[1] - 1];

  board.receiveAttack(target);

  expect(ship.hitNo).toBe(1);
});
test("same attack does not count twice", () => {
  const board = GameBoard();

  let target;

  for (let r = 0; r < 7; r++) {
    for (let c = 0; c < 7; c++) {
      if (typeof board.coordinates[r][c] === "object") {
        target = [r + 1, c + 1];
        break;
      }
    }

    if (target) break;
  }

  const ship = board.coordinates[target[0] - 1][target[1] - 1];

  board.receiveAttack(target);
  board.receiveAttack(target);

  expect(ship.hitNo).toBe(1);
});
test("places all five ships", () => {
  const board = GameBoard();

  const ships = new Set();

  board.coordinates.forEach((row) => {
    row.forEach((cell) => {
      if (typeof cell === "object") {
        ships.add(cell.name);
      }
    });
  });

  expect(ships.size).toBe(5);
});
test("attacking ship increases hit count", () => {
  const board = GameBoard();

  let ship;
  let target;

  for (let r = 0; r < 7; r++) {
    for (let c = 0; c < 7; c++) {
      if (typeof board.coordinates[r][c] === "object") {
        ship = board.coordinates[r][c];
        target = [r + 1, c + 1];
        break;
      }
    }

    if (target) break;
  }

  board.receiveAttack(target);

  expect(ship.hitNo).toBe(1);
});
test("same coordinate cannot damage ship twice", () => {
  const board = GameBoard();

  let ship;
  let target;

  for (let r = 0; r < 7; r++) {
    for (let c = 0; c < 7; c++) {
      if (typeof board.coordinates[r][c] === "object") {
        ship = board.coordinates[r][c];
        target = [r + 1, c + 1];
        break;
      }
    }

    if (target) break;
  }

  board.receiveAttack(target);
  board.receiveAttack(target);

  expect(ship.hitNo).toBe(1);
});
