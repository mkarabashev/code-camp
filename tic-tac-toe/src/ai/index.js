const Board = require('../game/board.js');

module.exports = (function () {
  function max(board, level, origin = false) {
    level--;
    let bestMove;
    let bestScore = Number.NEGATIVE_INFINITY;

    board.getMoves().forEach(move => {
      const nextBoard = boardCopy(board);
      nextBoard.registerMove('computer', move);

      const score = nextBoard.isGameOver() || level === 0
        ? nextBoard.getHeuristics('computer')
        : min(nextBoard, level);

      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    });

    return origin ? bestMove : bestScore;
  }

  function min(board, level) {
    level--;
    let bestScore = Number.POSITIVE_INFINITY;

    board.getMoves().forEach(move => {
      const nextBoard = boardCopy(board);
      nextBoard.registerMove('human', move);

      const score = nextBoard.isGameOver() || level === 0
        ? -nextBoard.getHeuristics('human')
        : max(nextBoard, level);

      bestScore = Math.min(score, bestScore);
    });
    return bestScore;
  }

  function boardCopy(board) {
    return new Board(
      board.getMoves(),
      board.getRecord('human'),
      board.getRecord('computer')
    );
  }

  return {
    rand: function (board) {
      return board.getMoves()[ Math.floor(Math.random() * (board.getMoves().length - 1)) ];
    },
    minimax: function (board) {
      return max(board, 6, true);
    }
  }
})();
