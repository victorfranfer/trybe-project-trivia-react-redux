const initialState = {
  isDisabled: false,
};

const timer = (state = initialState, action) => {
  switch (action.type) {
  case 'DISABLE_OPTIONS':
    return {
      ...state,
      isDisabled: true,
    };
  default:
    return state;
  }
};

export default timer;
