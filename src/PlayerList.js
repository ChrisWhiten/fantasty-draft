import React, { Component } from 'react';

class PlayerList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sort: null,
      desc: true,
    };
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

  render() {
    let sortedPlayers;
    if (this.state.sort) {
      sortedPlayers = this.props.players.sort((a, b) => {
        if (!this.state.desc) {
          return a[this.state.sort] - b[this.state.sort];
        } else {
          return b[this.state.sort] - a[this.state.sort];
        }
      });
    } else {
      sortedPlayers = this.props.players;
    }

    //sortedPlayers = sortedPlayers.slice(0, 50);

    return (
      <div className='players'>
        {
          this.props.showScores &&
          <table className='player-table'>
            <thead>
              <tr>
                <th onClick={this._setSort.bind(this, 'name')}>Name</th>
                <th>Team</th>
                <th>Positions</th>
                <th onClick={this._setSort.bind(this, 'age')}>Age</th>
                <th onClick={this._setSort.bind(this, 'gp')}>GP</th>
                <th onClick={this._setSort.bind(this, 'goalScore')}>G</th>
                <th onClick={this._setSort.bind(this, 'assistScore')}>A</th>
                <th onClick={this._setSort.bind(this, 'pppScore')}>PPP</th>
                <th onClick={this._setSort.bind(this, 'shotScore')}>Shots</th>
                <th onClick={this._setSort.bind(this, 'blockScore')}>BSH</th>
                <th onClick={this._setSort.bind(this, 'fwScore')}>FW</th>
                <th onClick={this._setSort.bind(this, 'hitScore')}>Hits</th>
                <th onClick={this._setSort.bind(this, 'pimScore')}>PIM</th>
                <th onClick={this._setSort.bind(this, 'playerScore')}>Player Score</th>
                <th onClick={this._setSort.bind(this, 'noFWPlayerScore')}>No FW Player Score</th>
              </tr>
            </thead>
            <tbody>
              {
                sortedPlayers.map(p => {
                  return (
                    <tr key={`player-${p.name}`}>
                      <td>{p.name}</td>
                      <td>{p.team}</td>
                      <td>{p.positions.join()}</td>
                      <td>{p.age}</td>
                      <td>{p.gp}</td>
                      <td>{p.goalScore.toFixed(5)}</td>
                      <td>{p.assistScore.toFixed(5)}</td>
                      <td>{p.pppScore.toFixed(5)}</td>
                      <td>{p.shotScore.toFixed(5)}</td>
                      <td>{p.blockScore.toFixed(5)}</td>
                      <td>{p.fwScore.toFixed(5)}</td>
                      <td>{p.hitScore.toFixed(5)}</td>
                      <td>{p.pimScore.toFixed(5)}</td>
                      <td>{p.playerScore}</td>
                      <td>{p.noFWPlayerScore}</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        }
        {
          !this.props.showScores &&
          <table className='player-table'>
            <thead>
              <tr>
                <th onClick={this._setSort.bind(this, 'name')}>Name</th>
                <th>Team</th>
                <th>Positions</th>
                <th onClick={this._setSort.bind(this, 'age')}>Age</th>
                <th onClick={this._setSort.bind(this, 'gp')}>GP</th>
                <th onClick={this._setSort.bind(this, 'g')}>G</th>
                <th onClick={this._setSort.bind(this, 'a')}>A</th>
                <th onClick={this._setSort.bind(this, 'a1')}>A1</th>
                <th onClick={this._setSort.bind(this, 'p')}>Pts</th>
                <th onClick={this._setSort.bind(this, 'ppp')}>PPP</th>
                <th onClick={this._setSort.bind(this, 's')}>Shots</th>
                <th onClick={this._setSort.bind(this, 'b')}>BSH</th>
                <th onClick={this._setSort.bind(this, 'f')}>FW</th>
                <th onClick={this._setSort.bind(this, 'h')}>Hits</th>
                <th onClick={this._setSort.bind(this, 'pim')}>PIM</th>
                <th onClick={this._setSort.bind(this, 'playerScore')}>Player Score</th>
                <th onClick={this._setSort.bind(this, 'noFWPlayerScore')}>No FW Player Score</th>
              </tr>
            </thead>
            <tbody>
              {
                sortedPlayers.map(p => {
                  return (
                    <tr key={`player-${p.name}`}>
                      <td>{p.name}</td>
                      <td>{p.team}</td>
                      <td>{p.positions.join()}</td>
                      <td>{p.age}</td>
                      <td>{p.gp}</td>
                      <td>{p.g}</td>
                      <td>{p.a}</td>
                      <td>{p.a1}</td>
                      <td>{p.p}</td>
                      <td>{p.ppp}</td>
                      <td>{p.s}</td>
                      <td>{p.b}</td>
                      <td>{p.f}</td>
                      <td>{p.h}</td>
                      <td>{p.pim}</td>
                      <td>{p.playerScore}</td>
                      <td>{p.noFWPlayerScore}</td>
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

export default PlayerList;