import { combineReducers } from 'redux';
import player from './player';
import timer from './timer';
import game from './game';

const reducer = combineReducers({
  player,
  timer,
  game,
});

export default reducer;
