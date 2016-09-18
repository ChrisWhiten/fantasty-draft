import AppDispatcher from '../AppDispatcher.js';

export default {
  setUsers(users) {
    AppDispatcher.dispatch('SET_USERS', {
      users: users,
    });
  },

  draft(user, player) {
    AppDispatcher.dispatch('DRAFT_PLAYER', {
      user: user,
      player: player,
    });
  }
}