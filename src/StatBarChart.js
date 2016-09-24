import React, { Component } from 'react';
import d3 from 'd3';

class StatBarChart extends Component {
  constructor(props) {
    super(props);

    this.margin = 10;
    this.width = 600 - this.margin;
    this.height = 80 - this.margin;
  }

  componentDidMount() {
    this.svg = d3.select(`#bar-chart-${this.props.type}`)
      .attr('width', this.width + this.margin)
      .attr('height', this.height + this.margin);

    this._updateData();
  }

  componentDidUpdate() {
    this._updateData();
  }

  _updateData() {
    const maxY = d3.max(this.props.data, d => { return d.value });

    const xAxisScale = d3.scale.ordinal().domain(this.props.data.map(d => { console.debug('d:', d); return u.key; })).rangeRoundBands([0, this.width], .1);
    const yAxisScale = d3.scale.linear().domain([0, maxY]).range([this.height - this.margin, 0]); // y axis top is 0, bottom is max val

    const bars = this.svg.selectAll('rect')
      .data(this.props.data);

    bars
      .enter()
      .append('rect')
      .attr('y', d => {
        return yAxisScale(d.value);
      })
      .attr('height', d => {
        return this.height - yAxisScale(d.value);
      })
      .attr('width', xAxisScale.rangeBand())
      .attr('transform', (d, i) => {
        return `translate(${xAxisScale(d.key)}, 0)`;
      });

    bars.exit().remove();

    this.svg.selectAll('text')
      .data(this.props.data)
      .enter()
      .append('text')
      .text(d => {
        return d.key;
      })
      .attr('x', xAxisScale.rangeBand() / 2)
      .attr('y', d => { return yAxisScale(d.value) + 3; })
      .attr('dy', '.75em')
      .attr('transform', (d) => {
        return `translate(${xAxisScale(d.key)}, 0)`;
      });

    bars.attr('height', d => {
      return this.height - yAxisScale(d.value);
    })
    .attr('y', d => {
      return yAxisScale(d.value);
    });
  }

  render() {
    return (
      <svg id={`bar-chart-${this.props.type}`} className='bar-chart'>
        <text y={0} x={this.width / 2} dy=".75em">{this.props.type}</text>
      </svg>
    );
  }
}

export default StatBarChart;
