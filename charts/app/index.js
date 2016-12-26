import 'bootstrap';
import './modules/chart';

const $nav = $('.nav');
const $chartContainer = $('.chart-container');
const charts = {
  gdp: $chartContainer.find('#gdp-chart'),
  doping: $chartContainer.find('#doping-chart'),
  temperature: $chartContainer.find('#temp-chart')
};

$($nav).on('click', 'li', (e) => chartHandler(e));

const chartHandler = (e) => {
  const element = $(e.target).closest('li');
  render(element);
};

const render = chart => {
  $nav.children().removeClass('active');
  $(chart).addClass('active');

  $chartContainer.children().hide();
  charts[ chart.attr('id') ].show();
};

render($nav.find('#gdp'));
