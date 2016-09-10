import React, { Component } from 'react';
import SettingsActions from './actions/SettingsActions.js';

class SettingsMenu extends Component {
  _handlePerGameChange() {
    SettingsActions.setPerGame(this.refs.perGame.checked);
  }

  _handleShowScoresChange() {
    SettingsActions.setShowScores(this.refs.showScores.checked);
  }

  _handleVisualizeChange() {
    SettingsActions.setVisualize(this.refs.visualize.checked);
  }

  render() {
    return (
      <div className='settings'>
       <span>
          <label>Visualize
            <input
              type='checkbox'
              defaultChecked={this.props.visualize}
              ref='visualize'
              onChange={this._handleVisualizeChange.bind(this)}
            />
          </label>
        </span>
        <span>
          <label>Show Scores
            <input
              type='checkbox'
              defaultChecked={this.props.showScores}
              ref='showScores'
              onChange={this._handleShowScoresChange.bind(this)}
            />
          </label>
        </span>
        <span>
          <label>Per-game
            <input
              type='checkbox'
              defaultChecked={this.props.perGame}
              ref='perGame'
              onChange={this._handlePerGameChange.bind(this)}
            />
          </label>
        </span>
      </div>
    );
  }
}

export default SettingsMenu;
