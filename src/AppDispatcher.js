import { Dispatcher } from 'flux';

const flux = new Dispatcher();

export default {
  register(callback) {
    return flux.register(callback);
  },

  // Some Flux examples have methods like `handleViewAction`
  // or `handleServerAction` here. They are only useful if you
  // want to have extra pre-processing or logging for such actions,
  // but I found no need for them.
  waitFor(ids) {
    return flux.waitFor(ids);
  },

  /**
   * Dispatches a single action.
   */
  dispatch(type, action = {}) {
    if (!type) {
      throw new Error('You forgot to specify type.');
    }

    flux.dispatch({ type, ...action });
  },
};
