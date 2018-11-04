const humanPlayer = "x";
const aiPlayer = "o";

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

const getNewBoard = () => ({
  0: undefined,
  1: undefined,
  2: undefined,
  3: undefined,
  4: undefined,
  5: undefined,
  6: undefined,
  7: undefined,
  8: undefined
});

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

const getAvailableSquares = board => {
  return shuffle(getCellsByPlayer(board, undefined));
};

const getCellsByPlayer = (board, player) => {
  return Object.entries(board).reduce((acc, [cell, value]) => {
    if (value === player) {
      acc.push(parseInt(cell, 10));
    }
    return acc;
  }, []);
};

const isDraw = board =>
  Object.entries(board).every(([_, value]) => value !== undefined);

const isAWinningPosition = squares => {
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
  return output;
};

const evaluate = (board, player) => {
  const squares = getCellsByPlayer(board, player);
  const output = isAWinningPosition(squares);

  if (output > -1) {
    return player === humanPlayer ? 10 : -10;
  }
  return 0;
};

const minmax = (board, isMax, alpha, beta) => {
  const evaluation = evaluate(board, isMax ? aiPlayer : humanPlayer);
  const emptySquares = getAvailableSquares(board);

  if (evaluation) {
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

export {
  getNewBoard,
  winningPositions,
  minmax,
  getAvailableSquares,
  isAWinningPosition,
  getCellsByPlayer,
  isDraw
};
