const initialState = {
  questions: [],
  isLoading: true,
  redirect: false,
};

const game = (state = initialState, action) => {
  switch (action.type) {
  case 'UPDATE_QUESTIONS':
    return {
      ...state,
      questions: action.questions,
      isLoading: false,
    };
  case 'REDIRECT':
    return {
      ...state,
      redirect: true,
    };
  case 'RESET_ALL':
    return {
      ...state,
      questions: [],
      isLoading: true,
      redirect: false,
    };
  default:
    return state;
  }
};

export default game;
