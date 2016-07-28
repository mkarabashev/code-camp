import events from '../events/events.js';
import {Howl} from 'howler';

const sound1 = require('../assets/simonSound1.mp3');
const sound2 = require('../assets/simonSound2.mp3');
const sound3 = require('../assets/simonSound3.mp3');
const sound4 = require('../assets/simonSound4.mp3');
const error = require('../assets/beep.mp3');

module.exports = (function () {
  let game = false;
  let strict = false;
  let round = 0;
  let current = 0;
  let sequence = [];

  const mapToSound = {
    'tl': sound1,
    'tr': sound2,
    'bl': sound3,
    'br': sound4,
    'fake': error
  }

  // cache DOM
  const display = document.getElementById('counter');
  const btnContainer = document.getElementById('color-buttons');
  const btns = document.getElementsByClassName('box');

  // bind events
  btnContainer.addEventListener('click', onClick);
  events.on('start', onNewState);
  events.on('power', () => onNewState(true));
  events.on('strict', (_strict) => strict = _strict);

  //render
  function render(target, onPower = false) {
    if (target) {
      addClass(target, 'js-activate');
      new Howl({ src: [mapToSound[ target.id ]] }).play();
      window.setTimeout(() => removeClass(target, 'js-activate'), 500);
    }

    if (onPower && display.innerHTML !== '') display.innerHTML = '';
    else display.innerHTML = round < 10 ? '0' + round : round;
  }

  function onClick(event) {
    function error() {
      const fake = document.createElement('fakeElement');
      fake.id = 'fake';

      window.setTimeout(() => {
        current = 0;
        render(fake);
        strict ? onNewState() : showSequence();
      }, 600);
    }

    if (!game || !event.target || !event.target.className === 'box') return;
    render(event.target);
    event.target === btns[ sequence[current] ] ? current++ : error();

    if (current > round) {
      round++;
      current = 0;
      showSequence();
    }
  }

  function onNewState(onPower = false) {
    round = 0;
    game = onPower ? false : true;

    if (game) {
      makeSequence();
      showSequence();
    }

    render(null, onPower);
  }

  function makeSequence() {
    for (let i = 0; i < 20; i++) {
      sequence[i] = Math.floor(Math.random() * 4);
    }
  }

  function showSequence(i = 0) {
    if (i <= round) window.setTimeout(() => {
      render(btns[ sequence[i] ]);
      showSequence(++i);
    }, 600);
  }

  function addClass(element, _class) {
    element.className += ' ' + _class;
  }

  function removeClass(element, _class) {
    element.className = element.className.replace(' ' + _class, '');
  }
})();
