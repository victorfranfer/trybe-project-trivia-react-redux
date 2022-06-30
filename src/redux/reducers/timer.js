const initialState = {
  isDisabled: false,
  secondsLeft: 0,
};

const timer = (state = initialState, action) => {
  switch (action.type) {
  case 'DISABLE_OPTIONS':
    return {
      ...state,
      isDisabled: true,
      secondsLeft: action.seconds,
    };
  default:
    return state;
  }
};

export default timer;
