import c3 from 'c3';
import { evalHeight } from '../lib/responsive';

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
    colors: {
      Place: 'black'
    },
    color: (color, d) => {
      return d.index && attributes.data.json[d.index].Doping.length ? 'red' : color;
    }
  },
  axis: {
    x: {
      type: 'timeseries',
      tick: {
        format: '%M:%S',
        count: 5,
        culling: false
      }
    },
    y: {
      inverted: true
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

fetch(dataUrl)
  .then(response => response.json())
  .then(json => {
    json.min = findMin(json);
    json = convertData(json);
    attributes.data.json = json;
    chart = c3.generate(attributes);
  }).catch(ex => console.log('parsing failed', ex));
