const el = require('../cache/index.js');
const events = require('../events/events.js');

module.exports = (function () {
  let iterCount = 0; // checks if the board has been set up
  let animationiteration = 'animationiteration';
  let animationPlayState = 'animation-play-state';

  // DOM cache
  const $td = el.$outer.find('td');

  // bind events
  events.on('browserCheck', setPrefix);
  events.on('newScreen', render);
  el.$axleRt.on(animationiteration, onIteration);

  // render
  function render() {
    const state = el.$inner
      .css(animationPlayState) === 'paused'
        ? 'running'
        : 'paused';

    for (let prop in el) {
      if (el.hasOwnProperty(prop) && prop !== '$btn' && prop !== '$td') {
        el[prop].css(animationPlayState, state);
      }
    }

    const status = el.$inner.css('animation-play-state') === 'paused';
    events.emit('animationStatus', status);
  }

  // other functions
  function onIteration() {
    iterCount++;
    events.emit('isChoice', iterCount % 2 ? false : true);
    render();
  }

  function setPrefix(prefix) {
    if (prefix) {
      animationiteration = prefix + 'AnimationIteration';
      animationPlayState = '-' + prefix + '-animation-play-state'
    }
  }
})();
