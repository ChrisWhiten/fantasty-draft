import AppDispatcher from '../AppDispatcher.js';

export default {
  createFilter(f) {
    AppDispatcher.dispatch('CREATE_FILTER',{
      filter: f,
    });
  },

  deleteFilter(id) {
    AppDispatcher.dispatch('DELETE_FILTER', {
      id: id,
    });
  }
}