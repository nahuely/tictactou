const humanPlayer = "x";
const aiPlayer = "o";

const elements = {
  board: ".board",
  cells: ".board div.board__item",
  reset: "button.controls__button"
};

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const board = {
  0: undefined,
  1: undefined,
  2: undefined,
  3: undefined,
  4: undefined,
  5: undefined,
  6: undefined,
  7: undefined,
  8: undefined
};

const cleanBoard = () => {
  for (const square in board) {
    board[square] = undefined;
  }
};

const getAvailableSquares = board => {
  return getCellsByPlayer(board, undefined);
};

const getCellsByPlayer = (board, player) => {
  return Object.entries(board).reduce((acc, [cell, value]) => {
    if (value === player) {
      acc.push(parseInt(cell, 10));
    }
    return acc;
  }, []);
};

const evaluate = (board, player) => {
  const squares = getCellsByPlayer(board, player);
  let output = -1;

  for (const [index, winningSequence] of winningPositions.entries()) {
    const winning = winningSequence.every(position =>
      squares.includes(position)
    );
    if (winning) {
      output = index;
      break;
    }
  }

  if (output > -1) {
    return player === humanPlayer ? 10 : -10;
  }
  return 0;
};

const resetBoard = () => {
  const boardEl = document.querySelectorAll(elements.cells);
  boardEl.forEach(cell => {
    cell.innerText = "";
  });
};

const renderBoard = (board, winningPosition = null) => {
  const boardEl = document.querySelectorAll(elements.cells);
  boardEl.forEach(cell => {
    cell.innerText = "";
  });

  boardEl.forEach((cell, index) => {
    const value = !board[index] ? "" : board[index];
    if (winningPosition) {
      if (winningPosition.includes(index)) {
        cell.style.background = "yellow";
      }
    }
    cell.innerText = value;
  });
};

const printBoard = board => {
  let string = "";
  for (const cell in board) {
    string += board[cell];
    if (cell == 2 || cell == 5 || cell == 8) {
      string + "\n";
    }
  }
  return string;
};

const minmax = (board, isMax, alpha, beta) => {
  const evaluation = evaluate(board, isMax ? aiPlayer : humanPlayer);
  const emptySquares = getAvailableSquares(board);

  if (evaluation) {
    debugger;
    return { score: evaluation };
  }

  if (emptySquares.length === 0 && !evaluation) {
    return { score: 0 };
  }

  if (isMax) {
    let max = { score: -Infinity, move: null };
    for (let x = 0; x < emptySquares.length; x++) {
      let value = emptySquares[x];
      let ev = minmax({ ...board, [value]: humanPlayer }, false, alpha, beta);
      if (ev.score > max.score) {
        max.score = ev.score;
        max.move = value;
      }

      alpha = Math.max(alpha, ev.score);
      if (beta <= alpha) {
        break;
      }
    }
    return max;
  } else {
    let min = { score: +Infinity, move: null };
    for (let x = 0; x < emptySquares.length; x++) {
      let value = emptySquares[x];
      let ev = minmax({ ...board, [value]: aiPlayer }, true, alpha, beta);
      if (ev.score < min.score) {
        min.score = ev.score;
        min.move = value;
      }

      beta = Math.min(beta, ev.score);
      if (beta <= alpha) {
        break;
      }
    }
    return min;
  }
};

const main = () => {
  const reset = document.querySelector(elements.reset);
  const b = document.querySelector(elements.board);

  reset.addEventListener("click", el => {
    cleanBoard();
    resetBoard();
  });

  b.addEventListener("click", el => {
    const id = el.target.dataset.id;
    if (id && !board[id]) {
      board[id] = humanPlayer;
      renderBoard({ ...board });

      const move = minmax({ ...board }, false, -Infinity, +Infinity);
      console.log(move);
      board[move.move] = aiPlayer;
      renderBoard({ ...board });
    }
  });
};

main();
