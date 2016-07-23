const el = require('../cache/index.js');

module.exports = (function () {
  const $onVictory = el.$outer.find('#on-victory');
  const $td = el.$outer.find('td');

  function render(line) {
    if (line !== false) {
      window.setTimeout(() => {
        $onVictory.addClass('line ' + 'line-' + line);
      }, 700);
      window.setTimeout(() => {
        $onVictory.removeClass('line ' + 'line-' + line);
      }, 3700);
    } else {
      window.setTimeout(() => $td.addClass('tie'), 700);
      window.setTimeout(() => {
        $td.removeClass('tie');
      }, 3700);
    }
  }

  return {
    showWin: function (record) {
      for (let i = 0; i < 8; i++) {
        if (record.get(i).size === 3) return render(i);
      }
      return render(false);
    }
  }
})();
