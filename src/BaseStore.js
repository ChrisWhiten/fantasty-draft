import { EventEmitter } from 'events';
import assign from 'object-assign';

var CHANGE_EVENT = 'CHANGE';

export default assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  addOnceChangeListener: function(callback) {
    this.once(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

});
