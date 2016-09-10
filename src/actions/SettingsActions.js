import AppDispatcher from '../AppDispatcher.js';

export default {
  setPerGame(perGame) {
    AppDispatcher.dispatch('SET_PER_GAME', {
      perGame: perGame,
    });
  },

  setShowScores(showScores) {
    AppDispatcher.dispatch('SET_SHOW_SCORES', {
      showScores: showScores,
    });
  },

  setVisualize(visualize) {
    AppDispatcher.dispatch('SET_VISUALIZE', {
      visualize: visualize,
    });
  }
}