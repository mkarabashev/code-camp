var Immutable = require('immutable');

module.exports = function (lines = Immutable.List()) {
  // methods used to check for winning conditions
  // lines keeps track of the moves made by a player
  let winHeuristics = 0;

  // construct the lines array
  // note: this is only used for testing the module
  if (lines.size === 0) {
    for (let i = 0; i < 8; i++) {
      lines = lines.set(i, Immutable.Set());
    }
  }

  // win conditions checks
  function checkLines(move) {
    const col = move % 3;
    const row = Math.ceil(move / 3) + 2;

    lines = lines.set(col, lines.get(col).add(move));
    lines = lines.set(row, lines.get(row).add(move));

    winHeuristics = Math.max(
      lines.get(col).size,
      lines.get(row).size,
      checkDiags(move)
    )
    return winHeuristics;
  }

  function checkDiags(move) {
    if (move === '1' || move === '5' || move === '9') {
      lines = lines.set(6, lines.get(6).add(move));
    }

    if (move === '3' || move === '5' || move === '7') {
      lines = lines.set(7, lines.get(7).add(move));
    }

    return Math.max(lines.get(6).size, lines.get(7).size);
  }

  return Object.assign(this, {
    hasWon: function () {
      return winHeuristics === 3;
    },
    getLines: function () {
      return lines;
    },
    getHeuristics: function () {
      return winHeuristics === 3 ? 10 : 0;
    },
    checkLines
  });
};
