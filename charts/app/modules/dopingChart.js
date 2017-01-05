import c3 from 'c3';
import * as d3 from 'd3';
import { evalHeight } from '../lib/utils';

const dataUrl = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json';
let chart;

const attributes = {
  size: {
    height: evalHeight(window.innerHeight)
  },
  onresize: () => chart.resize({
    height: evalHeight(window.innerHeight)
  }),
  padding: {
    right: 10
  },
  title:  {
    text: 'Doping in Professional Bicycle Racing',
  },
  bindto: '#doping-chart',
  data: {
    xFormat: '%M:%S',
    keys: {
      x: 'Time',
      value: ['Place']
    },
    type: 'scatter',
    color: (color, d) => {
      return typeof d.index === 'number' &&
        !!attributes.data.json[d.index].Doping.length
          ? 'red'
          : 'grey';
    }
  },
  legend: {
    hide: true
  },
  axis: {
    x: {
      type: 'timeseries',
      label: {
        text: 'Minutes Behind Fastest Time',
        position: 'outer-center'
      },
      tick: {
        format: '%M:%S',
        count: 5,
        culling: false
      },
      padding: {
        left: Math.pow(10, 4),
        right: 4 * Math.pow(10, 4)
      }
    },
    y: {
      inverted: true,
      label: {
        text: 'Ranking',
        position: 'outer-middle'
      }
    }
  },
  tooltip: {
    format: {
      name: (val, ratio, id, i) => {
        const { Name, Nationality } = attributes.data.json[i];
        return `${Name} (${Nationality}) `;
      },
      value: (val, ratio, id, i) => {
        const { Doping, Year } = attributes.data.json[i];
        return `${Doping} (${Year})`;
      }
    }
  }
};

const findMin = data => {
  let min = Number.POSITIVE_INFINITY;
  for (let entry of data) {
    min = Math.min(min, entry.Seconds);
  }
  return min;
};

const convertData = (data) => {
  for (let entry of data) {
    const dif = entry.Seconds - data.min;
    const min = Math.floor(dif / 60);
    const sec = dif % 60;
    entry.Time = min + ':' + sec;
  }

  return data;
};

const addPointLabels = (chart, data) => {
  const points = chart.internal.main
    .selectAll('.' + c3.chart.internal.fn.CLASS.circles)
    .selectAll('.' + c3.chart.internal.fn.CLASS.circle)[0];

  const texts = chart.internal.main
    .selectAll('.' + c3.chart.internal.fn.CLASS.chartTexts)
    .selectAll('.' + c3.chart.internal.fn.CLASS.chartText)[0];

  points.forEach(function (point, i) {
    d3.select(texts[0])
      .append('text')
      .attr('text-anchor', 'right')
      .attr('dy', '0.3em')
      .attr('x', +d3.select(point).attr('cx') + 10)
      .attr('y', d3.select(point).attr('cy'))
      .text(data[i].Name);
  });
};

fetch(dataUrl)
  .then(res => res.ok ? res.json() : console.log('Response was not OK'))
  .then(json => {
    json.min = findMin(json);
    json = convertData(json);
    attributes.data.json = json;
    chart = c3.generate(attributes);
    addPointLabels(chart, json);
  }).catch(ex => console.log('parsing failed', ex));
