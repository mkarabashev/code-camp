import events from '../events/events.js';

module.exports = function (name, time = 0) {
  // cache DOM
  const less = document.getElementById(name + '-less');
  const more = document.getElementById(name + '-more');
  const display = document.getElementById(name + '-duration');

  // bind events
  less.addEventListener('click', () => makeChange('less'));
  less.addEventListener('mousedown', () => continuousChange('less'));
  less.addEventListener('touchstart', () => continuousChange('less'));
  more.addEventListener('click', () => makeChange('more'));
  more.addEventListener('mousedown', () => continuousChange('more'));
  more.addEventListener('touchstart', () => continuousChange('more'));

  // render
  function render() {
    display.innerHTML = time < 10 ? '0' + time : time;
  }

  render();

  function makeChange(change) {
    change === 'less' ? (time > 0 ? time-- : 0) : time++;
    events.emit(name + 'Changed', time);
    render();
  }

  function continuousChange(change) {
    const interval = window.setTimeout(() => {
      const interval2 = window.setInterval(() => makeChange(change), 30);
      document.addEventListener('mouseup', () => clearInterval(interval2));
      document.addEventListener('touchend', () => clearInterval(interval2));
    }, 300);

    document.addEventListener('mouseup', () => clearInterval(interval));
    document.addEventListener('touchend', () => clearInterval(interval));
  }

  return () => time;
};
