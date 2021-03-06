import assign from 'object-assign';
import AppDispatcher from './AppDispatcher.js';
import BaseStore from './BaseStore.js';

import _players from './players.json';

let allPlayers = _players;
allPlayers.forEach(p => {
  p.name = `${p['First Name']} ${p['Last Name']}`;
  p.positions = [];
  p.Position.split('/').forEach(position => {
    p.positions.push(position);
  });
});

const weights = {
  hits: 1,//0.8,
  goals: 1,
  assists: 1,
  pims: 0.1,//0.8,
  shots: 1,
  fws: 0.5, //1,//0.8,
  ppps: 1,
  blocks: 1,//0.9,
};

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
    p.hitScore = ((p.h/totalHits)/p.gp) * 82 * weights.hits;
    p.goalScore = ((p.g/totalGoals)/p.gp) * 82 * weights.goals;
    p.assistScore = ((p.a/totalAssists)/p.gp) * 82 * weights.assists;
    p.pimScore = ((p.pim/totalPIMs)/p.gp) * 82 * weights.pims;
    p.shotScore = ((p.s/totalShots)/p.gp) * 82 * weights.shots;
    p.fwScore = ((p.f/totalFws)/p.gp) * 82 * weights.fws;
    p.pppScore = ((p.ppp/totalPPPs)/p.gp) * 82 * weights.ppps;
    p.blockScore = ((p.b/totalBlocks)/p.gp) * 82 * weights.blocks;
    p.playerScore = parseFloat((p.blockScore + p.shotScore + p.assistScore + p.goalScore + p.fwScore + p.hitScore + p.pppScore).toFixed(5));
    p.noFWPlayerScore = parseFloat((p.blockScore + p.shotScore + p.assistScore + p.goalScore + p.hitScore + p.pppScore).toFixed(5));
  });
  //'hits', 'goals', 'assists', 'sogs', 'blks', 'fws', 'ppps

}

generatePlayerScores(allPlayers);
let _filters = [];
let availablePlayers = allPlayers;
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

    case 'SET_USERS':
      action.users.forEach(user => {
        _users[user] = [];
      });

      PlayerStore.emitChange();
      break;

    case 'DRAFT_PLAYER':
      let selectedPlayer;
      for (let i = 0; i < availablePlayers.length; i++) {
        if (availablePlayers[i].name.toLowerCase() === action.player.toLowerCase()) {
          selectedPlayer = availablePlayers[i];
          availablePlayers.splice(i, 1);
          break;
        }
      }
      // let selectedPlayer = availablePlayers.filter(player => {
      //   return player.name.toLowerCase() === action.player.toLowerCase();
      // });
      console.log(selectedPlayer);
      _users[action.user].push(selectedPlayer/*[0]*/);

      // availablePlayers = availablePlayers.filter(player => {
      //   return player.name.toLowerCase() !== action.player.toLowerCase();
      // });

      PlayerStore.emitChange();
      break;

    default:
      console.debug('unexpected action type:', action.type);
  }
});

export default PlayerStore;
