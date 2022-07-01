const initialState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = initialState, action) => {
  switch (action.type) {
  case 'LOGIN':
    return {
      ...state,
      name: action.login.nome,
      gravatarEmail: action.login.email,
    };
  case 'UPDATE_SCORE':
    return {
      ...state,
      assertions: state.assertions + 1,
      score: state.score + action.pontos,
    };
  case 'RESET_ALL':
    return {
      ...state,
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
    };
  default:
    return state;
  }
};

export default player;
