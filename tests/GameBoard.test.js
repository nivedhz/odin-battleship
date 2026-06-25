import GameBoard from "../src/game/GameBoard";

test("board is 10x10", () => {
  const board = GameBoard();

  expect(board.coordinates.length).toBe(10);

  board.coordinates.forEach((row) => {
    expect(row.length).toBe(10);
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

  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 10; c++) {
      if (typeof board.coordinates[r][c] === "object") {
        target = [r, c];
        break;
      }
    }

    if (target) break;
  }

  const ship = board.coordinates[target[0]][target[1]];

  board.receiveAttack(target);

  expect(ship.hitNo).toBe(1);
});
test("same attack does not count twice", () => {
  const board = GameBoard();

  let target;

  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 10; c++) {
      if (typeof board.coordinates[r][c] === "object") {
        target = [r, c];
        break;
      }
    }

    if (target) break;
  }

  const ship = board.coordinates[target[0]][target[1]];

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

  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 10; c++) {
      if (typeof board.coordinates[r][c] === "object") {
        ship = board.coordinates[r][c];
        target = [r, c];
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

  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 10; c++) {
      if (typeof board.coordinates[r][c] === "object") {
        ship = board.coordinates[r][c];
        target = [r, c];
        break;
      }
    }

    if (target) break;
  }

  board.receiveAttack(target);
  board.receiveAttack(target);

  expect(ship.hitNo).toBe(1);
});
test("returns true when all ships are sunk", () => {
  const board = GameBoard();

  const attackedShips = new Set();

  board.coordinates.forEach((row, _) => {
    row.forEach((cell, _) => {
      if (typeof cell === "object" && !attackedShips.has(cell)) {
        attackedShips.add(cell);

        for (let i = 0; i < cell.length; i++) {
          cell.hit();
        }
      }
    });
  });

  expect(board.reportSunkStatus()).toBe(true);
});
test("returns false when not all ships are sunk", () => {
  const board = GameBoard();

  expect(board.reportSunkStatus()).toBe(false);
});
test("returns false when only some ships are sunk", () => {
  const board = GameBoard();

  let firstShip;

  outer: for (const row of board.coordinates) {
    for (const cell of row) {
      if (typeof cell === "object") {
        firstShip = cell;
        break outer;
      }
    }
  }

  for (let i = 0; i < firstShip.length; i++) {
    firstShip.hit();
  }

  expect(board.reportSunkStatus()).toBe(false);
});
