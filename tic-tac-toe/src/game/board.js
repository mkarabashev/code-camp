const Win = require('./winning.js');

module.exports = (function (
  cells = [],            // available moves
  humanRecord = undefined,      // moves made by human
  computerRecord = undefined    // moves made by computer
) {
  var human = new Win(humanRecord);         // player record
  var computer = new Win(computerRecord);   // ai record
  var gameOver = false;

  // construct the cells if they are not given
  if (cells.length === 0) {
    for (let i = 0; i < 9; i++) {
      cells[i] = (i + 1).toString();
    }
  }

  // update the list of available moves
  function filterCells(move) {
    cells = cells.filter(val => val !== move);
  }

  function gameOverCheck() {
    if (cells.length === 0) gameOver = 'It was a draw';
    if (human.hasWon()) gameOver = 'You won! There must be a bug in the code';
    if (computer.hasWon()) gameOver = 'AI won!';
  }

  return {
    getMoves: function () {
      return cells;
    },
    getRecord: function (player) {
      return player === 'human'
        ? human.getLines()
        : computer.getLines();
    },
    getHeuristics: function (player) {
      return player === 'human'
        ? human.getHeuristics()
        : computer.getHeuristics();
    },
    isGameOver: function () {
      if (!gameOver) gameOverCheck();
      return gameOver;
    },
    registerMove: function (player, move) {
      filterCells(move);
      const score = player === 'human'
        ? human.checkLines(move)
        : computer.checkLines(move);
      return score;
    }
  }
});
