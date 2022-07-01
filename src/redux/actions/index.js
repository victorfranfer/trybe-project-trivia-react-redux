export const loginAction = (login) => ({
  type: 'LOGIN', login,
});

export const scoreAction = (pontos) => ({
  type: 'UPDATE_SCORE', pontos,
});

export const disableOptions = (seconds) => ({
  type: 'DISABLE_OPTIONS', seconds,
});

export const questionsAction = (questions) => ({
  type: 'UPDATE_QUESTIONS', questions,
});

export const redirectAction = () => ({
  type: 'REDIRECT',
});

export const resetTimerAction = () => ({
  type: 'RESET',
});

export const resetAction = () => ({
  type: 'RESET_ALL',
});

export function thunkQuestions(token) {
  return async (dispatch) => {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const questions = await response.json();
    if (questions.response_code > 0) {
      dispatch(redirectAction());
    }
    dispatch(questionsAction(questions.results));
  };
}
