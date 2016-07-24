const el = require('../cache/index.js');
const events = require('../events/events.js');

module.exports = (function () {
  // chache DOM
  const $onVictory = el.$outer.find('#on-victory');
  const $td = el.$outer.find('td');

  // bind events
  events.on('victory', render);

  function render(record) {
    function renderVictory(i) {
      window.setTimeout(() => $onVictory.addClass('line line-' + i), 700);
      window.setTimeout(() => $onVictory.removeClass('line line-' + i), 3700);
    }

    function renderTie() {
      window.setTimeout(() => $td.addClass('tie'), 700);
      window.setTimeout(() => $td.removeClass('tie'), 3700);
    }

    for (let i = 0; i < 8; i++) {
      if (record.get(i).size === 3) {
        return renderVictory(i);
      }
    }

    return renderTie();
  }
})();
