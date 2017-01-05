import 'whatwg-fetch';
import c3 from 'c3';
import * as d3 from 'd3';
import { months, evalHeight } from '../lib/utils';

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
    text: 'US Gross Domestic Product by Quarter'
  },
  bindto: '#gdp-chart',
  data: {
    x: 'Date',
    type: 'bar'
  },
  axis: {
    x: {
      label: {
        text: 'Seasonally Adjusted Annual Rate'
      },
      type: 'timeseries',
      tick: {
        format: '%Y',
        count: 10,
        culling: false
      }
    },
    y: {
      label: {
        text: 'Billions of Dollars',
        position: 'inner-middle'
      },
      tick: {
        format: d3.format('$,')
      }
    }
  },
  tooltip: {
    format: {
      title: (d) => `${months[d.getMonth()]} ${d.getFullYear()}`
    }
  }
};

const dataUrl = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';

fetch(dataUrl)
  .then(res => res.ok ? res.json() : console.log('Response was not OK'))
  .then(json => json.data)
  .then(data => {
    data = [['Date', 'US GDP']].concat(data);
    attributes.data.rows = data;
    chart = c3.generate(attributes);
  }).catch(ex => console.log('parsing failed', ex));
