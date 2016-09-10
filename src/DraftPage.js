import React, { Component } from 'react';
import PlayerStore from './PlayerStore.js';
import PlayerList from './PlayerList.js';
import PlayerVisualization from './PlayerVisualization.js';
import FilterList from './FilterList.js';
import FilterCreator from './FilterCreator.js';
import SettingsMenu from './SettingsMenu.js';

class DraftPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      players: PlayerStore.getFilteredPlayers(),
      filters: PlayerStore.getFilters(),
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
    let newState = {};
    newState.players = PlayerStore.getFilteredPlayers();
    newState.filters = PlayerStore.getFilters();

    this.setState(newState);
  }

  render() {
    const showVisualization = PlayerStore.visualize();

    return (
      <div className="draft-page">
        <div className="draft-page-header">
          <h2>Welcome to the draft</h2>
        </div>
        <SettingsMenu perGame={PlayerStore.perGame()} showScores={PlayerStore.showScores()} visualize={showVisualization} />
        <FilterCreator />
        <FilterList filters={this.state.filters} />
        {
          showVisualization &&
          <PlayerVisualization players={this.state.players} />
        }
        {
          !showVisualization &&
          <PlayerList players={this.state.players} showScores={PlayerStore.showScores()} />
        }
      </div>
    );
  }
}

export default DraftPage;
