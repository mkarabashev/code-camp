import events from '../events/events.js';
import Howl from 'howler';

module.exports = (function () {
  let game = false;
  let strict = false;
  let round = 0;

  // cache DOM
  const display = document.getElementById('counter');
  const buttons = document.getElementById('color-buttons');

  // bind events
  buttons.addEventListener('click', onClick);
  events.on('start', onNewState);
  events.on('power', () => onNewState(true));
  events.on('strict', (_strict) => strict = _strict);

  //render
  function render(onPower = false) {
    if (onPower && display.innerHTML !== '') display.innerHTML = '';
    else display.innerHTML = round < 10 ? '0' + round : round;
  }

  function onClick(event) {
    if (game && event.target && event.target.className === 'box') {
      addClass(event.target, 'js-activate');
      window.setTimeout(() => removeClass(event.target, 'js-activate'), 1000);
      round++;
      render();
    }
  }

  function onNewState(onPower = false) {
    game = onPower ? false : true;
    round = 0;
    render(onPower);
  }

  function addClass(element, _class) {
    element.className += ' ' + _class;
  }

  function removeClass(element, _class) {
    element.className = element.className.replace(' ' + _class, '');
  }
})();
