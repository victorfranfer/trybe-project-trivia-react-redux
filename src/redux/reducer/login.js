const initialState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const login = (state = initialState, action) => {
  switch (action.type) {
  case '':
    return {};
  default:
    return state;
  }
};

export default login;
