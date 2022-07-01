import React from 'react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { screen } from '@testing-library/react';

describe('Testes da tela de Ranking', () => {

  it('Verifica se possui o botão para ir ao início', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    history.push('/ranking');

    const btnHome = screen.getByRole('button', {
      name: /Sair do Jogo/i,
    });

    userEvent.click(btnHome);

    const btnPlay = screen.getByRole('button', {
      name: /Play/i,
    });
    expect(btnPlay).toBeInTheDocument();
  })
});