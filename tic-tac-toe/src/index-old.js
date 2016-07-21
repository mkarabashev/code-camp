var Immutable = require('immutable');

module.exports = function (lines = Immutable.List()) {
  // methods used to check for winning conditions
  // lines keeps track of the moves made by a player
  var win = false;

  // construct the lines array
  // note: this is only used for testing the module
  if (lines.size === 0) {
    for (let i = 0; i < 8; i++) {
      lines = lines.set(i, new Set());
    }
  }

  // win conditions checks
  function checkLines(move) {
    const modulo = move % 3;
    const ceil = Math.ceil(move / 3);

    lines.get(modulo).add(move);
    lines.get(ceil + 2).add(move);

    if (lines.get(modulo).size === 3
        || lines.get(ceil + 2).size === 3
        || checkDiags(move)) {
          win = true;
    }
  }

  function checkDiags(move) {
    var isThree = false;

    if (move === '1' || move === '5' || move === '9') {
      lines.get(6).add(move);
      if (lines.get(6).size === 3) isThree = true;
    }

    if (move === '3' || move === '5' || move === '7') {
      lines.get(7).add(move);
      if (lines.get(7).size === 3) isThree = true;
    }

    return isThree;
  }

  return Object.assign(this, {
    hasWon: function () {
      return win;
    },
    checkLines,
    getLines: function () {
      return lines.slice(0);
    }
  });
};
