import React, { Component } from 'react';

class PlayerMenu extends Component {

  _handleCloseClick() {
    if (this.props.onCloseClick) {
      this.props.onCloseClick(this.props.name);
    }
  }

  render() {
    const style = {
      left: this.props.data.x,
      top: this.props.data.y,
    };

    return (
      <div className='player-overlay' style={style}>
        <div className='player-overlay-bar'>
          <span onClick={this._handleCloseClick.bind(this)}>close me</span>
        </div>
        <div className='player-overlay-content'>
          <h3>{this.props.data.name}</h3>
        </div>
      </div>
    );
  }
}

export default PlayerMenu;
