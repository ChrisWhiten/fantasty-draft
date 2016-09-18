import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import UserActions from './actions/UserActions';

class Setup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialized: null,
      users: ['Chris'],
    };
  }
  _handleInitialize() {
    this.setState({
      initialized: 'initializing',
    });
  }

  _handleAdd() {
    const addUserNode = ReactDOM.findDOMNode(this.refs.addUser);
    const user = addUserNode.value;
    const newUsers = this.state.users;
    newUsers.push(user);

    this.setState({
      users: newUsers,
    });

    addUserNode.value = '';
  }

  _handleKeyPress(e) {
    if (e.key === 'Enter') {
      this._handleAdd();
    }
  }

  _handleDone() {
    this.setState({
      initialized: 'done',
    });

    UserActions.setUsers(this.state.users);
  }

  render() {
    return (
      <div className='setup'>
        {
          !this.state.initialized &&
          <div className='initialize-setup' onClick={this._handleInitialize.bind(this)}>
            Setup
          </div>
        }
        {
          this.state.initialized === 'initializing' &&
          <div>
            <div className='pick-players'>
            {
              this.state.users.map(user => {
                return <div key={`user-${user}`} className='user'>{user}</div>;
              })
            }
              <input type='text' ref='addUser' onKeyPress={this._handleKeyPress.bind(this)} />
              <span className='add-user' onClick={this._handleAdd.bind(this)}>ADD</span>
            </div>
            <div className='done-picking' onClick={this._handleDone.bind(this)}>
              DONE
            </div>
          </div>
        }
      </div>
    );
  }
}

export default Setup;