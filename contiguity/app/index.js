import * as d3 from 'd3';

const dataUrl = 'https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json';

const height = 700;
const width = 1000;

const boundCoords = (direction, val, offset = 10) => {
  const hi = direction === 'x' ? width : height;
  const lo = 0;

  if (val < lo) return lo + offset;
  if (val > hi) return hi - offset;
  return val;
};

const svg = d3.select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

const tooltip = d3.select('body').append('div')
  .attr('class', 'tooltip')
  .style('opacity', 0);

const dragStarted = d => {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
};

const dragged = d => {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
};

const dragEnded = d => {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
};

const simulation = d3.forceSimulation()
  .force('link', d3.forceLink().id((d) => d.index).distance(50))
  .force('collide', d3.forceCollide(() => 12))
  .force('center', d3.forceCenter(width / 2, height / 2))
  .force('charge', d3.forceManyBody().strength(-100).distanceMax(150));

const render = data => {
  const link = svg.append('g')
    .attr('class', 'links')
    .selectAll('line')
    .data(data.links).enter()
    .append('line')
    .attr('stroke', 'black');

  const node = d3.select('body').append('div')
    .attr('class', 'node')
    .selectAll('img')
    .data(data.nodes).enter()
    .append('img')
    .attr('class', (d) => 'flag flag-' + d.code)
    .call(d3.drag()
      .on('start', dragStarted)
      .on('drag', dragged)
      .on('end', dragEnded)
    )
    .on('mouseover', (d) => {
      tooltip.transition()
        .duration(200)
        .style('opacity', 1);

      tooltip.html(d.country)
        .style('left', boundCoords('x', d.x) + 'px')
        .style('top', (boundCoords('y', d.y) + 15) + 'px');
    })
    .on('mouseout', () => {
      tooltip.transition()
        .style('opacity', 0);
    });

  const ticked = () => {
    link
      .attr('x1', (d) => boundCoords('x', d.source.x))
      .attr('y1', (d) => boundCoords('y', d.source.y))
      .attr('x2', (d) => boundCoords('x', d.target.x))
      .attr('y2', (d) => boundCoords('y', d.target.y));

    node
      .style('left', (d) => boundCoords('x', d.x) + 'px')
      .style('top', (d) => boundCoords('y', d.y) + 'px');
  };

  simulation
    .nodes(data.nodes)
    .on('tick', ticked);

  simulation.force('link')
    .links(data.links);
};

d3.json(dataUrl, (error, json) => {
  if (error) return console.log(error);
  render(json);
});
