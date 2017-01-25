import c3 from 'c3';
import { months, evalHeight } from '../lib/utils';

const dataUrl = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json';

const data = months.map(month => {
  let row = [];
  for (let i = 0; i < 263; i++) {
    row[i] = 1;
  }
  return [month].concat(row);
});

let chart;
let temp = {};

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
    text: 'Monthly Global Land-Surface Temperature',
  },
  bindto: '#temp-chart',
  data: {
    x: 'year',
    xFormat: '%Y',
    type: 'bar',
    columns: data,
    groups: [months],
    order: null,
    color: (color, d) => {
      if (d.id) {
        const coords = d.x.getFullYear() + ':' + d.id;
        const currentTemp = temp[coords];
        if (currentTemp < 2.7) return 'purple';
        if (currentTemp < 3.9) return 'blue';
        if (currentTemp < 5) return '#43bbc6';
        if (currentTemp < 6.1) return '#85f2bd';
        if (currentTemp < 7.2) return '#d3e8a0';
        if (currentTemp < 8.3) return '#fcff63';
        if (currentTemp < 9.4) return '#ffbb2b';
        if (currentTemp < 10.5) return '#ea7120';
        if (currentTemp < 11.6) return '#ea4f20';
        if (currentTemp < 12.7) return '#b50000';
        return '#680000';
      }
    }
  },
  axis: {
    x: {
      type: 'timeseries',
      tick: {
        format: '%Y'
      }
    },
    y: {
      inverted: true,
      tick: {
        format: d => d === 0 ? '' : months[d - 1]
      },
      max: 11
    }
  },
  bar: {
    width: {
      ratio: 1
    }
  },
  tooltip: {
    grouped: false,
    format: {
      value: (val, ratio, id, i) =>
        i == 262 && (id == 'October' || id == 'November' || id == 'December')
          ? '' // the last 2 months of 2015 are missing from the dataset
          : `${temp[`${1753 + i}:${id}`].toFixed(2)} Degrees`
    }
  },
  legend: {
    hide: true
  }
};

const getYears = data => {
  let year;
  let arr = ['year'];
  for (let entry of data.monthlyVariance) {
    if (entry.year && year !== entry.year) arr.push(entry.year.toString());
    year = entry.year;
  }

  return arr;
};

const getTemp = data => {
  let dict = {};
  for (let entry of data.monthlyVariance) {
    dict[entry.year + ':' + months[entry.month - 1]] = data.baseTemperature + entry.variance;
  }

  return dict;
};

fetch(dataUrl)
  .then(res => res.ok ? res.json() : console.log('Response was not OK'))
  .then(json => {
    temp = getTemp(json);
    attributes.data.columns.push(getYears(json));
    chart = c3.generate(attributes);
  }).catch(ex => console.log('parsing failed', ex));
