require('./sass/main.sass');
const animation = require('./animation/index.js');
const Board = require('./game/board.js');
const el = require('./cache/index.js');
const ai = require('./ai/index.js');
const victory = require('./animation/victory.js');

(function () {
  // setting up the game record
  const mapToDOM = {
    1: 3,
    2: 0,
    3: 6,
    4: 4,
    5: 1,
    6: 7,
    7: 5,
    8: 2,
    9: 8
  }
  let board = null;
  let symbol = {
    'human': '',
    'computer': ''
  };
  let turnAI;
  // DOM cache
  const $btn = el.$innerC.find('.btn');
  const $td = el.$outer.find('td');
  const $whoWon = el.$innerC.find('.who-won');

  // bind
  el.$board.on('click', 'td', makeMove);
  el.$boardI.on('click', 'td', makeMove);
  $btn.on('click', '.choice', onClick);

  // render (board related)
  // board construction animation is rendered at '../animation/animation.js'
  // victory animation is rendered at '../animation/victory.js'
  function render(element, content, bounce = false) {
    if (bounce) {
      element.html('<div class="symbol">' + content + '</div>');
    } else {
      element.html(content);
    }
  }

  // initiate animation, set the symbols, determine who goes first
  function onClick(event) {
    if (animation.animStatus()) {
      board = new Board();
      animation.renderCSS();
      assignSymbols(event);
      turnAI = false;
      if (Math.random() < 0.5) window.setTimeout(() => drawSymbolAI(true), 2900);
    }
  }

  // make legal moves and wait for the AI
  function makeMove(event) {
    if (!turnAI) {
      drawSymbol(event);
      if (turnAI) window.setTimeout(drawSymbolAI, 700);
    }
  }

  function drawSymbol(event) {
    if (animation.isChoice() || board.isGameOver()) return;
    const $add = $(event.target).closest('td');
    const move = $add.attr('id');

    if (board.getMoves().some(val => val === move)) {
      manageMove($add, 'human', move);
      if (!board.isGameOver()) turnAI = true;
    }
  }

  function drawSymbolAI(first = false) {
    if (board.getMoves().length) {
      const move = first ? ai.rand(board) : ai.minimax(board);
      const $add = $td.eq( mapToDOM[move] );
      manageMove($add, 'computer', move);
      if (!board.isGameOver()) window.setTimeout(() => turnAI = false, 200);
    }
  }

  // helper methods
  function manageMove(element, player, move) {
    render(element, symbol[player], true);
    board.registerMove(player, move);
    let isGameOver = board.isGameOver();

    if (typeof isGameOver === 'string') {
      render($whoWon, isGameOver);
      victory.showWin(board.getRecord(player));
      const timeout = isGameOver === 'It was a draw' ? 2000 : 3200
      window.setTimeout(animation.renderCSS, timeout);
    };
  }

  function assignSymbols(event) {
    const $symbol = $(event.target).closest('.choice');
    symbol.human = $symbol.attr('id') === 'o' ? 'O' : 'X';
    symbol.computer = symbol.human === 'O' ? 'X' : 'O';
  }
})();
