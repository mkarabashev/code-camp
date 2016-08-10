require('./polyfill/objAssign.js');
require('./modules/timer.js');
import Slider from './modules/slider.js';
import events from './events/events.js';
import cssClass from './modules/cssClasses.js';

const settings = (function () {
  const sessionSettings= new Slider('session', 25);
  const breakSettings = new Slider('break', 5);
  let _mode = 'session';

  // cache DOM
  const session = document.getElementById('session');
  const _break = document.getElementById('break');
  const pause = document.getElementById('pause');
  const reset = document.getElementById('reset');
  const settingsMenu = document.getElementById('settings-menu');

  // bind events
  events.on('initialize', renderSettings);
  pause.addEventListener('click', () => events.emit('pauseChanged'));
  reset.addEventListener('click', () => events.emit('reset'));
  session.addEventListener('click', () => onModeChange('session'));
  _break.addEventListener('click', () => onModeChange('break'));
  events.on('modeChanged', onModeChange);

  // render
  function renderSettings() {
    window.setTimeout(switchSettings, 100);
  }

  function renderColor() {
    const color = _mode === 'session' ? 'green' : 'blue';
    cssClass.replaceLast(settingsMenu, color);
  }

  function onModeChange(mode) {
    _mode = mode;
    renderColor();
    events.emit('switchMode', mode);
  }

  function switchSettings() {
    cssClass.switch(session, 'hide');
    cssClass.switch(_break, 'hide');
    cssClass.switch(pause, 'hide');
    cssClass.switch(reset, 'hide');
  }
})();
