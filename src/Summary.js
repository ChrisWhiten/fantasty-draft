import React, { Component } from 'react';
import PlayerStore from './PlayerStore.js';
import StatBarChart from './StatBarChart.js';

class Summary extends Component {
  constructor(props) {
    super(props);

    this.colours = [
      '#FF0000',
'#FF3300' ,
'#ff6600' ,
'#ff9900' ,
'#FFCC00' ,
'#FFFF00' ,
'#ccff00',
 '#99ff00',
 '#66ff00',
    '#33ff00',
    '#00FF00'
    ]

    this.state = {
      users: PlayerStore.getUsers(),
      sort: null,
      desc: true,
      showViz: false,
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
      users: PlayerStore.getUsers(),
    });
  }

   _setSort(sort) {
    if (this.state.sort === sort) {
      this.setState({
        desc: !this.state.desc,
      });
    } else {
      this.setState({
        sort: sort,
        desc: true,
      });
    }
  }

  _getSortIndex(sort) {
    switch (sort) {
      case 'name':
        return 10;
      case 'playerScore':
        return 0;
      case 'nofw':
        return 1;
      case 'g':
        return 2;
      case 'a':
        return 3;
      case 's':
        return 4;
      case 'ppp':
        return 5;
      case 'hit':
        return 6;
      case 'bsh':
        return 7;
      case 'pim':
        return 8;
      case 'fw':
        return 9;
      default:
        return 0;
    }
  }

  render() {
    if (!this.state.users || Object.keys(this.state.users).length === 0) {
      return null;
    }

    let summedUsers = [];
    Object.keys(this.state.users).forEach(u => {
      let summedPlayerScore = 0;
      let summedNoFWPlayerScore = 0;
      let summedHitScore = 0;
      let summedGoalScore = 0;
      let summedAssistScore = 0;
      let summedPIMSCore = 0;
      let summedShotScore = 0;
      let summedFWScore = 0;
      let summedPPPScore = 0;
      let summedBlockScore = 0;

      this.state.users[u].forEach(p => {
        summedPlayerScore += p.playerScore;
        summedNoFWPlayerScore += p.noFWPlayerScore;
        summedHitScore += p.hitScore;
        summedGoalScore += p.goalScore;
        summedAssistScore += p.assistScore;
        summedPIMSCore += p.pimScore;
        summedShotScore += p.shotScore;
        summedFWScore += p.fwScore;
        summedPPPScore += p.pppScore;
        summedBlockScore += p.blockScore;
      });

      summedUsers.push([summedPlayerScore, summedNoFWPlayerScore, summedGoalScore, summedAssistScore, summedShotScore, summedPPPScore, summedHitScore, summedBlockScore, summedPIMSCore, summedFWScore, u]);
    });

    let sortedUsers;
    if (this.state.sort) {
      sortedUsers = summedUsers.sort((a, b) => {
        if (!this.state.desc) {
          return a[this._getSortIndex(this.state.sort)] - b[this._getSortIndex(this.state.sort)];
        } else {
          return b[this._getSortIndex(this.state.sort)] - a[this._getSortIndex(this.state.sort)];
        }
      });
    } else {
      sortedUsers = summedUsers;
    }

    const playerScoreData = summedUsers.map(u => {
      return {name: u[10], value: u[0]};
    });
    const noFWPlayerScoreData = summedUsers.map(u => {
      return {name: u[10], value: u[1]};
    });
    const goalData = summedUsers.map(u => {
      return {name: u[10], value: u[2]};
    });
    const assistData = summedUsers.map(u => {
      return {name: u[10], value: u[3]};
    });
    const shotData = summedUsers.map(u => {
      return {name: u[10], value: u[4]};
    });
    const pppData = summedUsers.map(u => {
      return {name: u[10], value: u[5]};
    });
    const hitData = summedUsers.map(u => {
      return {name: u[10], value: u[6]};
    });
    const blockData = summedUsers.map(u => {
      return {name: u[10], value: u[7]};
    });
    const pimData = summedUsers.map(u => {
      return {name: u[10], value: u[8]};
    });
    const fwData = summedUsers.map(u => {
      return {name: u[10], value: u[9]};
    });

    const foo = {
      backgroundColor: this.colours[3],
    }

    console.log(sortedUsers);

    return (
      <div>
        {
          this.state.showViz &&
            <div className='bar-charts'>
              <StatBarChart type='PlayerScore' data={playerScoreData} />
              <StatBarChart type='NoFWPlayerScore' data={noFWPlayerScoreData} />
              <StatBarChart type='Goals' data={goalData} />
              <StatBarChart type='Assists' data={assistData} />
              <StatBarChart type='Shots' data={shotData} />
              <StatBarChart type='PPP' data={pppData} />
              <StatBarChart type='Hits' data={hitData} />
              <StatBarChart type='Blocks' data={blockData} />
              <StatBarChart type='PIMS' data={pimData} />
              <StatBarChart type='FW' data={fwData} />
            </div>
        }
        {
          !this.state.showViz &&
            <table className='player-table'>
              <thead>
                <tr>
                  <th onClick={this._setSort.bind(this, 'name')}>Name</th>
                  <th onClick={this._setSort.bind(this, 'playerScore')}>Player Score</th>
                  <th onClick={this._setSort.bind(this, 'nofw')}>No FW</th>
                  <th onClick={this._setSort.bind(this, 'g')}>G</th>
                  <th onClick={this._setSort.bind(this, 'a')}>A</th>
                  <th onClick={this._setSort.bind(this, 's')}>S</th>
                  <th onClick={this._setSort.bind(this, 'ppp')}>PPP</th>
                  <th onClick={this._setSort.bind(this, 'hit')}>Hit</th>
                  <th onClick={this._setSort.bind(this, 'bsh')}>BSH</th>
                  <th onClick={this._setSort.bind(this, 'pim')}>PIM</th>
                  <th onClick={this._setSort.bind(this, 'fw')}>FW</th>
                </tr>
              </thead>
              <tbody>
                {
                  sortedUsers.map(u => {
                    return (
                      <tr key={`user-${u[10]}`}>
                        <td>{u[10]}</td>
                        <td>{u[0].toFixed(4)}</td>
                        <td style={foo}>{u[1].toFixed(4)}</td>
                        <td>{u[2].toFixed(4)}</td>
                        <td>{u[3].toFixed(4)}</td>
                        <td>{u[4].toFixed(4)}</td>
                        <td>{u[5].toFixed(4)}</td>
                        <td>{u[6].toFixed(4)}</td>
                        <td>{u[7].toFixed(4)}</td>
                        <td>{u[8].toFixed(4)}</td>
                        <td>{u[9].toFixed(4)}</td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
        }
      </div>
    );
  }
}

export default Summary;
