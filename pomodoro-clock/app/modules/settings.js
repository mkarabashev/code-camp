import slider from './slider.js';
import events from '../events/events.js';
import cssClass from '../libs/cssClasses.js';

const settings = (function () {
  const sessionSettings= slider('session', 25);
  const breakSettings = slider('break', 5);
  let _mode = 'session';
  let pause = false;

  // cache DOM
  const el = {
    session: document.getElementById('session'),
    _break: document.getElementById('break'),
    pause: document.getElementById('pause'),
    reset: document.getElementById('reset'),
    settingsMenu: document.getElementById('settings-menu')
  }

  // bind events
  events.on('initialize', renderSettings);
  events.on('modeChanged', onModeChange);
  el.pause.addEventListener('click', () => events.emit('pauseChanged'));
  el.reset.addEventListener('click', () => events.emit('reset'));
  el.session.addEventListener('click', () => onModeChange('session'));
  el._break.addEventListener('click', () => onModeChange('break'));

  // render
  function renderSettings() {
    window.setTimeout(
      () => changeElements(cssClass.switch, 'hide', ['settingsMenu']),
      100
    );
  }

  function renderColor() {
    const color = _mode === 'session' ? 'green' : 'blue';
    changeElements(cssClass.replaceColors, color);
  }

  function onModeChange(mode) {
    _mode = mode;
    renderColor();
    events.emit('switchMode', mode);
  }

  function changeElements(fn, change, exclude = []) {
    for (let key in el) {
      if (el.hasOwnProperty(key) && !exclude.includes(key)) fn.call(cssClass, el[key], change);
    }
  }
})();
