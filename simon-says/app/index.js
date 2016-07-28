import browser from './browser/browser.js';
import events from './events/events.js';
import game from './game/game.js';

const controls = (function () {
  const prefix = browser;
  const transform = prefix ? '-' + prefix + '-transform' : 'transform';
  let power = false;
  let isStrict = false;

  // cache DOM
  const start = document.getElementById('start');
  const strict = document.getElementById('strict');
  const strictIndicator = document.getElementById('indicator');
  const onOff = document.getElementsByClassName('slider-box')[0];
  const slider = document.getElementsByClassName('slider')[0];

  // bind events
  onOff.addEventListener('click', onPower);
  start.addEventListener('click', onStart);
  strict.addEventListener('click', onStrict);

  // render
  function render(slide = true, strictChange = false) {
    if (slide) {
      slider.style.transform = power ? 'translateX(233%)' : 'translateX(0)';
      strictIndicator.style.background = 'black';
    }

    if (strictChange) {
      strictIndicator.style.background = isStrict ? 'red' : 'black';
    }
  }

  function onPower() {
    power = !power;
    isStrict = false;
    events.emit('power', power);
    events.emit('strict', isStrict);
    if (power) render();
    else render();
  }

  function onStart() {
    if (power) events.emit('start');
  }

  function onStrict() {
    if (power) {
      isStrict = !isStrict;
      render(false, true);
      events.emit('strict', isStrict);
    }
  }
})();
