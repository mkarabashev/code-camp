module.exports = (function () {
  // DOM cache
  const $outer = $('.outer-w');
  const $inner = $outer.find('.inner');
  const $innerC = $inner.find('.inner-container');
  const $boardI = $inner.find('.board-inner');
  const $board = $outer.find('.board');
  const $bg = $inner.find('.bg');
  const $axleLt = $outer.find('#axle-lt');
  const $axleLb = $outer.find('#axle-lb');
  const $axleRt = $outer.find('#axle-rt');
  const $axleRb = $outer.find('#axle-rb');
  const $platformL = $inner.find('#platform-l');
  const $platformR = $inner.find('#platform-r');

  return {
    $outer,
    $inner,
    $innerC,
    $boardI,
    $board,
    $bg,
    $axleLt,
    $axleRt,
    $axleLb,
    $axleRb,
    $platformL,
    $platformR
  }
})();
