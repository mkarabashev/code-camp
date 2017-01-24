import 'bootstrap';
import './modules/chart';

const $nav = $('.nav');
const $chartContainer = $('.chart-container');
const $charts = {
  gdp: $chartContainer.find('#gdp-chart'),
  doping: $chartContainer.find('#doping-chart'),
  temperature: $chartContainer.find('#temp-chart')
};

var $active = $nav.find('.active');
var $shown = $charts[$active.attr('id')];

$($nav).on('click', 'li', (e) => chartHandler(e));

const chartHandler = (e) => {
  const element = $(e.target).closest('li');
  render(element);
};

const render = chart => {
  if (!chart) { // render initially
    $chartContainer.children().hide();
    return void $shown.show();
  }

  $active.removeClass('active');
  ($active = $(chart)).addClass('active');

  $shown.hide();
  ($shown = $charts[ chart.attr('id') ]).show();
};

render();
