require('./sass/main.sass');
const animation = require('./animation/index.js');
const Board = require('./game/board.js');
const Win = require('./game/winning.js');
const el = require('./cache/index.js');
const ai = require('./ai/index.js');

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

  // DOM cache
  const $btn = el.$innerC.find('.btn');
  const $td = el.$outer.find('td');
  const $whoWon = el.$innerC.find('.who-won');

  // bind
  el.$board.on('click', 'td', makeMove);
  el.$boardI.on('click', 'td', makeMove);
  $btn.on('click', '.choice', onClick);

  // render (board related)
  // animation is render at '../animation/index.js'
  function render(element, content) {
    element.html(content);
  }

  // initiate animation, set the symbols, determine who goes first
  function onClick(event) {
    board = new Board();
    animation.renderCSS();
    assignSymbols(event);
    if (Math.random() < 0.5) drawSymbolAI(true);
  }

  // make legal moves and wait for the AI
  function makeMove(event) {
    const turnAI = drawSymbol(event);
    if (turnAI) drawSymbolAI();
  }

  function drawSymbol(event) {
    if (animation.isChoice() || board.isGameOver()) return;

    let turnAI = false;
    const $add = $(event.target).closest('td');
    const move = $add.attr('id');

    if (board.getMoves().some(val => val === move)) {
      manageMove($add, 'human', move);
      if (!board.isGameOver()) turnAI = true;
    }
    return turnAI;
  }

  function drawSymbolAI() {
    if (board.getMoves().length) {
      const move = arguments[0] ? ai.rand(board) : ai.minimax(board);
      const $add = $td.eq( mapToDOM[move] );
      manageMove($add, 'computer', move);
    }
  }

  // helper methods
  function manageMove(element, player, move) {
    render(element, symbol[player]);
    board.registerMove(player, move);
    let isGameOver = board.isGameOver();
    if (typeof isGameOver === 'string') {
      render($whoWon, isGameOver);
      animation.renderCSS();
    };
  }

  function assignSymbols(event) {
    const $symbol = $(event.target).closest('.choice');
    symbol.human = $symbol.attr('id') === 'o' ? 'O' : 'X';
    symbol.computer = symbol.human === 'O' ? 'X' : 'O';
  }
})();
