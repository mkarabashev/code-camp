module.exports = (function () {
  function touchCheck() {
    if (!('ontouchstart' in document.documentElement)) {
      document.body.className += ' no-touch';
      return false;
    }
    return true;
  }

  touchCheck();
})();
