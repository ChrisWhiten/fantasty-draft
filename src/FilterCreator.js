import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FilterActions from './actions/FilterActions.js';

class FilterCreator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      creating: null,
    };
  }

  _selectFilterType(filterType) {
    this.setState({
      creating: filterType,
    });
  }

  _renderPositionPicker() {
    return this.state.creating && this.state.creating.value === 'positions';
  }

  _renderTeamPicker() {
    return this.state.creating && this.state.creating.value === 'team';
  }

  _renderGenericPicker() {
    return this.state.creating && ['positions', 'team'].indexOf(this.state.creating.value) < 0;
  }

  _pickTeam() {
    const picker = ReactDOM.findDOMNode(this.refs.picker);
    const team = picker.value;

    if (team) {
      FilterActions.createFilter({
        operator: 'eq',
        value: team,
        property: 'team',
        id: `team-eq-${team}`,
      });

      this.setState({
        creating: null,
      });
    }
  }

  _submitGenericFilter() {
    const value = ReactDOM.findDOMNode(this.refs.genericInput).value;
    const operator = ReactDOM.findDOMNode(this.refs.genericOperator).value;

    FilterActions.createFilter({
      operator: operator,
      value: value,
      property: this.state.creating.value,
      id: `${this.state.creating.value}-${operator}-${value}`,
    });

    this.setState({
      creating: null,
    });
  }

  _submitPositionPicker() {
    const position = ReactDOM.findDOMNode(this.refs.positionPicker).value;

    FilterActions.createFilter({
      operator: 'eq',
      value: position,
      property: 'positions',
      id: `positions-eq-${position}`,
    });

    this.setState({
      creating: null,
    });
  }

  _handleKeyPress(e) {
    if (e.key === 'Enter') {
      this._submitGenericFilter();
    }
  }

  render() {
    const filterTypes = [{
      name: 'Assists',
      value: 'a',
    },{
      name: 'Primary assists',
      value: 'a1',
    }, {
      name: 'Goals',
      value: 'g',
    }, {
      name: 'Age',
      value: 'age',
    }, {
      name: 'PIMs',
      value: 'pim',
    }, {
      name: 'Positions',
      value: 'positions',
    }, {
      name: 'Team',
      value: 'team',
    }, {
      name: 'Hits',
      value: 'h',
    }, {
      name: 'Faceoff wins',
      value: 'f',
    }, {
      name: 'Blocked Shots',
      value: 'b',
    }, {
      name: 'Games Played',
      value: 'gp',
    }, {
      name: 'Shots',
      value: 's',
    }, {
      name: 'PPP',
      value: 'ppp',
    }];
    return (
      <div className='filter-creator'>
      {
        !this.state.creating &&
        <div className='new-filter'>
          <span className='filter-by'>Filter by:</span>
          {
            filterTypes.map(f => {
              return <span className='filter-type' key={`filter-${f.name}`} onClick={this._selectFilterType.bind(this, f)}>{f.name}</span>;
            })
          }
        </div>
      }

      {
        this._renderTeamPicker() &&
        <div className='team-picker'>
          <select ref='picker' defaultValue='' onChange={this._pickTeam.bind(this)}>
            <option value=''>Select a team</option>
            <option value='ANA'>Anaheim</option>
            <option value='ARI'>Arizona</option>
            <option value='BOS'>Boston</option>
            <option value='BUF'>Buffalo</option>
            <option value='CAR'>Carolina</option>
            <option value='CGY'>Calgary</option>
            <option value='CHI'>Chicago</option>
            <option value='COL'>Colorado</option>
            <option value='CBJ'>Columbus</option>
            <option value='DAL'>Dallas</option>
            <option value='DET'>Detroit</option>
            <option value='EDM'>Edmonton</option>
            <option value='FLA'>Florida</option>
            <option value='LAK'>Los Angeles</option>
            <option value='MIN'>Minnesota</option>
            <option value='MTL'>Montreal</option>
            <option value='NSH'>Nashville</option>
            <option value='NJD'>New Jersey</option>
            <option value='NYI'>NY Islanders</option>
            <option value='NYR'>NY Ranger</option>
            <option value='OTT'>Ottawa</option>
            <option value='PHI'>Philadelphia</option>
            <option value='PIT'>Pittsburgh</option>
            <option value='SJS'>San Jose</option>
            <option value='STL'>St Louis</option>
            <option value='TBL'>Tampa Bay</option>
            <option value='TOR'>Toronto</option>
            <option value='VAN'>San Jose</option>
            <option value='WSH'>Washington</option>
            <option value='WPG'>Winnipeg</option>
          </select>
        </div>
      }

      {
        this._renderGenericPicker() &&
        <div className='generic-picker'>
          <span className='generic-config'>
            <span>{this.state.creating.name}</span>
            <select ref='genericOperator'>
              <option value='gt'>&gt;</option>
              <option value='lt'>&lt;</option>
              <option value='eq'>&eq;</option>
            </select>
            <input type='number' ref='genericInput' className='generic-input' onKeyPress={this._handleKeyPress.bind(this)} />
            <span className='submit-filter' onClick={this._submitGenericFilter.bind(this)}>GO</span>
          </span>
        </div>
      }

      {
        this._renderPositionPicker() &&
        <div className='position-picker'>
          <span>Position:</span>
          <select ref='positionPicker'>
            <option value='LW'>LW</option>
            <option value='RW'>RW</option>
            <option value='C'>C</option>
            <option value='D'>D</option>
          </select>
          <span className='submit-filter' onClick={this._submitPositionPicker.bind(this)}>GO</span>
        </div>
      }
      </div>
    );
  }
}

export default FilterCreator;