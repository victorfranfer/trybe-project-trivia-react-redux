import { combineReducers } from 'redux';
import player from './player';
import timer from './timer';

const reducer = combineReducers({
  player,
  timer,
});

export default reducer;
