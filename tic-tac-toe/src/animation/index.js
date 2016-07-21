const browser = require('./browser.js');
const el = require('../cache/index.js');

module.exports = (function () {
  let iterCount = 0; // checks if the board has been set up
  const animationiteration = browser.browserCheck; // browser prefix

  // DOM cache
  const $td = el.$outer.find('td');

  // bind events
  el.$axleRt.on(animationiteration, onIteration);

  // render
  function renderHTML() {
    if (isChoice()) {
      $td.html('');
    }
  }

  function renderCSS() {
    const state = el.$inner
      .css('animation-play-state') === 'paused'
        ? 'running'
        : 'paused';

    for (let prop in el) {
      if (el.hasOwnProperty(prop) && prop !== '$btn' && prop !== '$td') {
        el[prop].css('animation-play-state', state);
      }
    }
  }

  // other functions
  function onIteration() {
    iterCount++;
    if (isChoice()) {
      renderHTML();
      renderCSS();
    } else {
      renderCSS();
    }
  }

  function isChoice() {
    return iterCount % 2 ? false : true;
  }

  return {
    isChoice,
    renderCSS
  };
})();
