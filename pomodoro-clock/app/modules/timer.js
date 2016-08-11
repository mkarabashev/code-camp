import events from '../events/events.js'
import cssClass from '../libs/cssClasses.js'
import { Howl } from 'howler';

const beep = require('../assets/beep.mp3');

module.exports = (function () {
  let animation = false;
  let paused = false;
  let menu = true;
  let session = true;
  let sessionTime = 25 * 60;
  let breakTime = 5 * 60;

  // cache DOM
  const timerMenu = document.getElementById('timer-menu');
  const timerBorder = document.getElementById('timer-border');
  const timer = document.getElementById('timer');

  // bind events
  timerMenu.addEventListener('click', switchScreen);
  events.on('reset', switchScreen);
  events.on('pauseChanged', pausedChange);
  events.on('sessionChanged', setSessionTime);
  events.on('breakChanged', setBreakTime);
  events.on('switchMode', renderMode);

  // render
  function renderPause() {
    paused ? cssClass.add(timer, 'blink') : cssClass.remove(timer, 'blink');
  }

  function renderTime(time = session ? sessionTime : breakTime) {
    timer.innerHTML = secToTime(time);
  }

  function renderMode(mode) {
    session = mode === 'session' ? true : false;
    const color = session ? 'green' : 'blue';
    cssClass.replaceColors(timerBorder, color);
    cssClass.replaceColors(timer, color);
    renderTime();
  }

  function renderScreen() {
    animation = true;
    window.setTimeout(() => animation = false, 400);

    events.emit('initialize');

    if (menu) {
      cssClass.remove(timerBorder, 'attention');
      cssClass.replace(timerMenu, 'minimize', 'maximize');
      window.setTimeout(clock, 400);
    } else {
      window.setTimeout(() => cssClass.switch(timerBorder, 'attention'), 400);
      cssClass.replace(timerMenu, 'maximize', 'minimize');
    }

    menu = !menu;
    renderTime();
  }

  function switchScreen() {
    if (!animation) {
      paused = false;
      renderScreen();
      renderPause();
    }
  }

  function pausedChange() {
    paused = !paused;
    renderPause();
  }

  function clock() {
    function countDown() {
      if (!paused) {
        if (intervalTime) intervalTime--;
        if (!menu) renderTime(intervalTime);
      }

      if (!intervalTime && !paused && !menu) {
        clearInterval(interval);
        new Howl({ src: beep }).play();
        session = !session;
        events.emit('modeChanged', session ? 'session' : 'break');
        clock();
      }

      if (menu) clearInterval(interval);
    }
    let intervalTime = session ? sessionTime : breakTime;
    const interval = window.setInterval(countDown, 1000);
  }

  function setSessionTime(time) {
    sessionTime = time * 60;
    if (session) renderTime();
  }

  function setBreakTime(time) {
    breakTime = time * 60;
    if (!session) renderTime();
  }

  function secToTime(time) {
    const sec = Math.floor(time % 60);
    const hm = Math.floor(time / 60);
    const min = Math.floor(hm % 60);
    const hours = Math.floor(hm / 60);
    return (hours ? hours + ':' : '')
      + (min < 10 ? 0 : '') + min + ':'
      + (sec < 10 ? 0 : '') + sec;
  }
})();
