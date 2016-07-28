module.exports = (function () {
  // introduce an element and try to animate it
  const element = document.createElement('fakeElement');
  const animations = {
    'animation': '',
    'OAnimation': 'o',
    'MozAnimation': 'moz',
    'WebkitAnimation': 'webkit'
  }

  function browserCheck() {
    for (let animation in animations) {
      if (element.style[animation] !== undefined) {
        return animations[ animation ];
      }
    }
  }
  return browserCheck();
})();
