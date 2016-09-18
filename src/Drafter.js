import React, { Component } from 'react';
import PlayerStore from './PlayerStore.js';
import UserActions from './actions/UserActions.js';
import ReactDOM from 'react-dom';

import Select from 'react-select';
import 'react-select/dist/react-select.css';


class Drafter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: PlayerStore.getFilteredPlayers(),
      users: PlayerStore.getUsers(),
      selectedPlayer: null,
    };

    this.playerStoreChangeListener = this._handlePlayerStoreChangeListener.bind(this);
  }

  componentWillMount() {
    PlayerStore.addChangeListener(this.playerStoreChangeListener);
  }

  componentWillUnmount() {
    PlayerStore.removeChangeListener(this.playerStoreChangeListener);
  }

  _handlePlayerStoreChangeListener() {
    this.setState({
      players: PlayerStore.getFilteredPlayers(),
      users: PlayerStore.getUsers(),
    });
  }

  _draft() {
    const user = ReactDOM.findDOMNode(this.refs.userPicker).value;
    UserActions.draft(user, this.state.selectedPlayer);

    this.setState({
      selectedPlayer: null,
    });
  }

  _handleSelectChange(player) {
    this.setState({
      selectedPlayer: player.value,
    });
  }

  render() {
    if (Object.keys(this.state.users).length === 0) {
      return null;
    }

    const options = [];
    this.state.players.forEach(p => {
      options.push({
        value: p.name,
        label: p.name,
      });
    });

    return (
      <div className='drafter'>
        <select ref='userPicker'>
          <option key='bad-selected-user' value='none'>Select a user</option>
          {
            Object.keys(this.state.users).map(user => {
              return <option key={`select-user=${user}`} value={user}>{user}</option>;
            })
          }
        </select>

        <Select name='player-picker' value={this.state.selectedPlayer} options={options} onChange={this._handleSelectChange.bind(this)} />
        <div className='draft-player' onClick={this._draft.bind(this)}>DRAFT</div>
      </div>
    );
  }
}

export default Drafter;
