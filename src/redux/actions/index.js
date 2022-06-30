export const loginAction = (login) => ({
  type: 'LOGIN', login,
});

export const scoreAction = (pontos) => ({
  type: 'UPDATE_SCORE', pontos,
});

export const disableOptions = (seconds) => ({
  type: 'DISABLE_OPTIONS', seconds,
});
