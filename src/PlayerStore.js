import assign from 'object-assign';
import AppDispatcher from './AppDispatcher.js';
import BaseStore from './BaseStore.js';

import _players from './players.json';

let allPlayers = _players;

function generatePlayerScores(players) {
  let totalHits = 0;
  let totalGoals = 0;
  let totalAssists = 0;
  let totalShots = 0;
  let totalBlocks = 0;
  let totalFws = 0;
  let totalPPPs = 0;
  let totalPIMs = 0;

  players.forEach(p => {
    totalHits += p.h;
    totalGoals += p.g;
    totalAssists += p.a;
    totalShots += p.s;
    totalBlocks += p.b;
    totalFws += p.f;
    totalPPPs += p.ppp;
    totalPIMs += p.pim;
  });

  players.forEach(p => {
    p.hitScore = ((p.h/totalHits)/p.gp) * 82;
    p.goalScore = ((p.g/totalGoals)/p.gp) * 82;
    p.assistScore = ((p.a/totalAssists)/p.gp) * 82;
    p.pimScore = ((p.pim/totalPIMs)/p.gp) * 82;
    p.shotScore = ((p.s/totalShots)/p.gp) * 82;
    p.fwScore = ((p.f/totalFws)/p.gp) * 82;
    p.pppScore = ((p.ppp/totalPPPs)/p.gp) * 82;
    p.blockScore = ((p.b/totalBlocks)/p.gp) * 82;
    p.playerScore = parseFloat((p.blockScore + p.shotScore + p.assistScore + p.goalScore + p.fwScore + p.hitScore + p.pppScore).toFixed(5));
    p.noFWPlayerScore = parseFloat((p.blockScore + p.shotScore + p.assistScore + p.goalScore + p.hitScore + p.pppScore).toFixed(5));
  });
  //'hits', 'goals', 'assists', 'sogs', 'blks', 'fws', 'ppps

}

generatePlayerScores(allPlayers);
let _filters = [];
let availablePlayers = allPlayers;
let myTeam = [];
let perGame = false;
let showScores = false;
let visualize = false;
let _users = {};

const PlayerStore = assign({}, BaseStore, {
  getAllPlayers: function() {
    return allPlayers;
  },

  getFilters: function() {
    return _filters;
  },

  getUsers: function() {
    return _users;
  },

  perGame: function() {
    return perGame;
  },

  showScores: function() {
    return showScores;
  },

  visualize: function() {
    return visualize;
  },

  getFilteredPlayers: function() {
    let filteredPlayers = JSON.parse(JSON.stringify(availablePlayers));
    _filters.forEach(f => {
      filteredPlayers = filteredPlayers.filter(p => {
        if (f.property === 'positions') {
          return p.positions.indexOf(f.value) > -1;
        } else {
          switch (f.operator) {
            case 'gt':
              return p[f.property] > f.value;
            case 'lt':
              return p[f.property] < f.value;
            case 'eq':
              return p[f.property] === f.value;
            default:
              console.debug('unknown operator', f.operator, f);
              return false;
          }
        }
      })
    });

    if (perGame) {
      filteredPlayers.forEach(f => {
        f.g = parseFloat((f.g/f.gp).toFixed(2));
        f.a = parseFloat((f.a/f.gp).toFixed(2));
        f.a1 = parseFloat((f.a1/f.gp).toFixed(2));
        f.p = parseFloat((f.p/f.gp).toFixed(2));
        f.s = parseFloat((f.s/f.gp).toFixed(2));
        f.b = parseFloat((f.b/f.gp).toFixed(2));
        f.h = parseFloat((f.h/f.gp).toFixed(2));
        f.pim = parseFloat((f.pim/f.gp).toFixed(2));
        f.f = parseFloat((f.f/f.gp).toFixed(2));
        f.ppp = parseFloat((f.ppp/f.gp).toFixed(2));
      });
    }

    return filteredPlayers;
  }
});

PlayerStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.type) {
    case 'CREATE_FILTER':
      _filters.push(action.filter);
      PlayerStore.emitChange();
      break;

    case 'DELETE_FILTER':
      _filters = _filters.filter(f => {
        return f.id !== action.id;
      });

      PlayerStore.emitChange();
      break;

    case 'SET_PER_GAME':
      perGame = action.perGame;
      PlayerStore.emitChange();
      break;

    case 'SET_SHOW_SCORES':
      showScores = action.showScores;
      PlayerStore.emitChange();
      break;

    case 'SET_VISUALIZE':
      visualize = action.visualize;
      PlayerStore.emitChange();
      break;

    case 'PLAYER_SELECTED_BY_OTHER':
      availablePlayers = availablePlayers.filter(p => p.name !== action.player.name);
      PlayerStore.emitChange();
      break;

    case 'PLAYER_SELECTED_BY_ME':
      availablePlayers = availablePlayers.filter(p => p.name !== action.player.name);
      myTeam.push(action.player);
      PlayerStore.emitChange();
      break;

    case 'SET_USERS':
      action.users.forEach(user => {
        _users[user] = [];
      });

      PlayerStore.emitChange();
      break;

    case 'DRAFT_PLAYER':
      let selectedPlayer = availablePlayers.filter(player => {
        return player.name.toLowerCase() === action.player.toLowerCase();
      });
      _users[action.user].push(selectedPlayer[0]);

      availablePlayers = availablePlayers.filter(player => {
        return player.name.toLowerCase() !== action.player.toLowerCase();
      });

      PlayerStore.emitChange();
      break;

    default:
      console.debug('unexpected action type:', action.type);
  }
});

export default PlayerStore;
