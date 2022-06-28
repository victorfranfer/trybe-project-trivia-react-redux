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
  default:
    return state;
  }
};

export default player;
