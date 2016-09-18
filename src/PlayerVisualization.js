import React, { Component } from 'react';
import PlayerMenu from './PlayerMenu.js';
import d3 from 'd3';

class PlayerVisualization extends Component {
  constructor(props) {
    super(props);

    this.margin = 75;
    this.width = 1200 - this.margin;
    this.height = 300 - this.margin;

    this.state = {
      menus: [],
    };
  }

  componentDidMount() {
    this.div = d3.select('.visualization-tooltip');
    this.div.style('opacity', 0)
    //this.div.transition().style('opacity', 0);
    this.svg = d3.select('.visualization')
      .append('svg')
        .attr('width', this.width + this.margin)
        .attr('height', this.height + this.margin)
      .append('g')
        .attr('class', 'chart');

    this._updateData();
  }

  componentDidUpdate() {
    this._updateData();
  }

  _updateData() {
    const minX = d3.min(this.props.players, d => { return d.goalScore });
    const maxX = d3.max(this.props.players, d => { return d.goalScore });
    const minY = d3.min(this.props.players, d => { return d.assistScore });
    const maxY = d3.max(this.props.players, d => { return d.assistScore });
    const xAxisScale = d3.scale.linear().domain([minX, maxX]).range([0, this.width]);
    const yAxisScale = d3.scale.linear().domain([minY, maxY]).range([this.height, 0]); // y axis top is 0, bottom is max val

    let selection = this.svg
      .selectAll('circle')
      .data(this.props.players);

    selection.enter()
      .append('circle')
        .attr('cx', d => { return xAxisScale(d.goalScore); })
        .attr('cy', d => { return yAxisScale(d.assistScore); })
        .on('mouseover', d => {
          this.div.transition()
            .duration(200)
            .style('opacity', 0.9);
          this.div.html(`<p>${d.name}</p>`)
            .style('left', (d3.event.pageX) + 'px')
            .style('top', (d3.event.pageY) + 'px');
        })
        .on('mouseout', d => {
          this.div.transition()
            .duration(500)
            .style('opacity', 0);
        })
        .on('click', d => {
          let newMenu = {
            name: d.name,
            x: `${d3.event.pageX}px`,
            y: `${d3.event.pageY}px`,
          };

          let newMenuList = this.state.menus;
          newMenuList.push(newMenu);

          this.setState({
            menus: newMenuList,
          });
        });

    selection.exit().remove();
  }

  _closeMenu(menu) {
    let filteredMenus = this.state.menus.filter(m => {
      return m.name !== menu.name;
    });

    this.setState({
      menus: filteredMenus,
    });
  }

  render() {
    return (
      <div className='visualization'>
        {
          this.state.menus.map(menu => {
            return <PlayerMenu key={`player-overlay-${menu.name}`} data={menu} onCloseClick={this._closeMenu.bind(this, menu)} />
          })
        }
        <div className='visualization-tooltip'>
        </div>
      </div>
    );
  }
}

export default PlayerVisualization;
