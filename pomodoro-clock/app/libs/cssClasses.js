module.exports = {
  add: function (element, _class) {
    element.className += ' ' + _class;
  },
  remove: function (element, _class) {
    element.className = element.className.replace(_class, '');
  },
  replace: function (element, _oldClass, _newClass) {
    element.className = element.className.replace(_oldClass, _newClass);
  },
  replaceColors: function (element, _class) {
    const colors = ['red', 'green', 'blue'];
    for (let color of colors) {
      if (this.check(element, color)) {
        this.replace(element, color, _class);
        break;
      }
    }
  },
  switch: function (element, _class) {
    this.check(element, _class) ? this.remove(element, _class) : this.add(element, _class);
  },
  check: function (element, _class) {
    return element.className.indexOf(_class) >= 0;
  }
};
