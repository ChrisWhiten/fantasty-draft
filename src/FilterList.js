import React, { Component } from 'react';
import FilterActions from './actions/FilterActions.js';

class FilterList extends Component {
  _deleteFilter(f) {
    FilterActions.deleteFilter(f.id);
  }

  _operator(op) {
    switch (op) {
      case 'eq':
        return '=';
      case 'gt':
        return '>';
      case 'lt':
        return '<';
      default:
        return '?';
    }
  }

  render() {
    return (
      <div className='filters'>
        <ul>
          {
            this.props.filters.map(filter => {
              return <li className='filter-row' key={`applied-filter-${filter.property}-${filter.value}-${filter.operator}`}>{filter.property} {this._operator(filter.operator)} {filter.value} <span className='delete-filter' onClick={this._deleteFilter.bind(this, filter)}>DELETE</span></li>;
            })
          }
        </ul>
      </div>
    );
  }
}

export default FilterList;
